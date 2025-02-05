<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CourtSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $session_ids = DB::table('session')->pluck('id');
        $court_ids = DB::table('courts')->pluck('id');

        foreach($session_ids as $session_id){
            foreach($court_ids as $court_id){
                DB::table('court_session')->insert([
                    'session_id' => $session_id,
                    'court_id' => $court_id,
                ]);
            }
        }
    }
}
