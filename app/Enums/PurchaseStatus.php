<?php

namespace App\Enums;

enum PurchaseStatus: string
{
    case Approved = 'approved';
    case Canceled = 'canceled'; // Add other statuses as needed
}