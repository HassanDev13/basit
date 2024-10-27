<?php

namespace App\Models;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Spatie\TranslationLoader\LanguageLine as TranslationLoaderLanguageLine;

class LanguageLine extends TranslationLoaderLanguageLine
{
    public static function boot()
    {
        parent::boot();

        $flushCache = function (self $languageLine) {
            $languageLine->flushCache();
        };

        static::saved($flushCache);
        static::deleted($flushCache);
    }

    public static function getTranslations(string $locale)
    {
        $cacheKey = "spatie.translation-loader.{$locale}";
        return Cache::rememberForever($cacheKey, function () use ($locale) {
            return static::query()
                ->get()
                ->reduce(function ($lines, self $languageLine) use ($locale) {
                    $translation = $languageLine->getTranslation($locale);

                    $lines[$languageLine->key] = $translation;

                    return $lines;
                }, []) ?? [];
        });
    }

    public function flushCache()
    {
        $locales = $this->getTranslatedLocales();

        foreach ($locales as $locale) {
            $cacheKey = "spatie.translation-loader.{$locale}";
            Cache::forget($cacheKey);

            // For debugging
            if (!Cache::has($cacheKey)) {
                Log::info("Cache key {$cacheKey} successfully forgotten.");
            } else {
                Log::error("Failed to forget cache key {$cacheKey}.");
            }
        }
    }
}
