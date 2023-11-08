# News App Backend

This is the backend app for the test project by Faran Ali for [Innoscripta](https://www.innoscripta.com)
This project is built in Laravel
To run this project, follow these commands:

open a terminal in the `backend` directory

run `composer install`

This will pull all the composer dependencies required

run `cp .env.example .env`

This will make a copy of the .env.example environment file. Make sure you add the News API keys.

run `vendor/bin/sail php artisan key:generate`

run `vendor/bin/sail php artisan jwt:secret`

run `vendor/bin/sail up -d`

This will start the Laravel server at [http://localhost](http://localhost)


run `vendor/bin/sail php artisan migrate`

run `vendor/bin/sail php artisan db:seed`


This will add a default user (email: faran@gmail.com, password: manager), and also seed the categories.

For the news article data, there are two options:

#### 1: Use the seeder
run `vendor/bin/sail php artisan articles:import`

This will import the data which has been saved to json files for the sake of saving time
#### 2: Use the APIs

To test the News APIs you can run:

`vendor/bin/sail php artisan news:fetch:news-api`-- News APi

`vendor/bin/sail php artisan news:fetch:guardian` -- The Guardian

`vendor/bin/sail php artisan news:fetch:ny-times` -- New York Times

`vendor/bin/sail php artisan news:fetch:all` -- New York Times

### Note:
Fetching from the APIs will only work if the `QUEUE_CONNECTION` is set to `redis` in the .env file

You also need to run `vendor/bin/sail php artisan horizon` in a separate terminal to start processing the Jobs. Fetching all APIs should take about 11-12 minutes.


