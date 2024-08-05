#!/bin/bash

echo "Select package manager:"
select pm in "npm" "yarn" "pnpm"; do
    case $pm in
        npm ) pm_install="npm install"; break;;
        yarn ) pm_install="yarn install"; break;;
        pnpm ) pm_install="pnpm install"; break;;
    esac
done

echo "Installing dependencies with $pm..."
$pm_install

echo "Setup completed."