<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i = 0; $i < 20;$i++){
            DB::table('users')->insert([
                'fullname'=> fake()->name(),
                'email' => fake()->email(),
                'password' => Hash::make('12345678')
            ]);
        }
        DB::table('users')->insert([
            'fullname'=> 'elsigma',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678')
        ]);
    }
}
