<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use Auth;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request as RequestFacade;
use Validator;

class RolesAndPermissionController extends Controller
{
    public function index()


    {
        $permissions = Permission::all()->map(function ($permission) {
            return [
                'id' => $permission->name, // Assuming 'name' holds the unique identifier
                'name' => $permission->display_name ?? $permission->name, // Using display_name if available
            ];
        });

        // Fetching all roles and eager loading their permissions
        $roles = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->display_name ?? $role->name, // Using display_name if available
                'permissions' => $role->permissions->pluck('name')->toArray(), // Plucking permission names
            ];
        });

        return Inertia::render('RoleAndPermission/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    // create new role
    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'display_name' => 'nullable|string|max:255',
        ]);

        Role::create($request->only('name', 'display_name'));

        return to_route('role.permission');
    }

    // atacj permisstion to role

    public function updateRoles(Request $request)
    {
        DB::beginTransaction();
        
        try {
            foreach ($request->input('roles') as $roleData) {
                // Validate each role's data
                $validatedData = Validator::make($roleData, [
                    'id' => 'nullable|exists:roles,id',
                    'name' => 'required|string',
                    'permissions' => 'required|array',
                    'permissions.*' => 'exists:permissions,name',
                ])->validate();
    
                // Find the role by ID or create a new one without using 'id'
                $role = isset($validatedData['id']) ? Role::find($validatedData['id']) : new Role();
                $role->name = $validatedData['name'];
                $role->save();
    
                // Check if permissions exist and fetch IDs
                $permissionIds = Permission::whereIn('name', $validatedData['permissions'])->pluck('id')->toArray();
    
                // Sync permissions
                $role->permissions()->sync($permissionIds);
    
                // Debug output for each role update
                logger("Updated role {$role->name} with permissions:", $validatedData['permissions']);
            }
    
            DB::commit();
    
            return redirect()->route('role.permission')->with('success', 'Roles and permissions updated successfully.');
    
        } catch (\Exception $e) {
            DB::rollBack();
            // Log the error for debugging
            logger()->error("Role update failed: {$e->getMessage()}");
            dd($e->getMessage());
            return redirect()->back()->withErrors(['error' => 'An error occurred while updating roles and permissions.']);
        }
    }
    
    
}
