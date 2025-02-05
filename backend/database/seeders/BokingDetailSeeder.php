<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BokingDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('booking_detail')->insert([
            'booking_id' => 1,
            'court_id' => 1,
            'sessions' => '08:00',
            'price' => 50000,
        ]);
        DB::table('booking_detail')->insert([
            'booking_id' => 1,
            'court_id' => 1,
            'sessions' => '09:00',
            'price' => 50000,
        ]);
        DB::table('booking_detail')->insert([
            'booking_id' => 1,
            'court_id' => 1,
            'sessions' => '12:00',
            'price' => 50000,
        ]);
        DB::table('booking_detail')->insert([
            'booking_id' => 1,
            'court_id' => 2,
            'sessions' => '08:00',
            'price' => 50000,
        ]);
        DB::table('booking_detail')->insert([
            'booking_id' => 1,
            'court_id' => 3,
            'sessions' => '21:00',
            'price' => 50000,
        ]);
    }
}
