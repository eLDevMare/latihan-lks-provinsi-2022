<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sportIds = DB::table('sports')->pluck('id');
        $courtNames = [
            'Court A',
            'Court B',
            'Court C',
            'Court D'
        ];


        foreach($sportIds as $sportId){
            foreach($courtNames as $courtName){
                DB::table('courts')->insert([
                    'sport_id' => $sportId,
                    'name' => $courtName,
                    'price' => 50000,
                    'remark' => 'halo'
                ]);
            }
        }
    }
}
