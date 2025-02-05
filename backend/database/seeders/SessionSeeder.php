<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('session')->insert([
            [
                'session' => '08:00',
            ],
            [   
                'session' => '09:00',
            ],
            [
                'session' => '10:00',
            ],
            [
                'session' => '11:00',
            ],
            [
                'session' => '12:00',
            ],
            [
                'session' => '13:00',
            ],
            [
                'session' => '14:00',
            ],
            [
                'session' => '15:00',
            ],
            [
                'session' => '16:00',
            ],
            [
                'session' => '17:00',
            ],
            [
                'session' => '18:00',
            ],
            [
                'session' => '19:00',
            ],
            [
                'session' => '20:00',
            ],
            [
                'session' => '21:00',
            ],
            [
                'session' => '22:00',
            ],
            [
                'session' => '23:00',
            ],

        ]);
    }
}
