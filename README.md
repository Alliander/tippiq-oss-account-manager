# Tippiq account manager OSS

*Update 03-09-2017*: This repository is now published as open source software under the GPL 3 License (see the LICENSE file).

*Warning*: Please take the appropriate security measures before running this software in production.

# tippiq-account-manager
Manage Personal data accross the tippiq services

The repository consists of two modules, api and dashboard. These are the backend and frontend of the same app. 

Both are built into a docker image and deployed together in a single kubernetes pod. 

A user in tippiq-id with the role 'administrator' is able to login and search for users by email. These users can then be deleted.
