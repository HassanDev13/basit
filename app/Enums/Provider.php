<?php

namespace App\Enums;

enum Provider: string
{
    case GOOGLE = "Google";
    case FACEBOOK = "Facebook";
    case GITHUB = "Github";
    case TWITTER = "Twitter";
    case DISCORD = "Discord";
    case GITLAB = "Gitlab";
    case EMAIL = "Email";
}
