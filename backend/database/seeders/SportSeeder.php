<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sports')->insert([
            [
                'name' => 'Badminton',
                'remark' => 'Indoor court'
            ],
            [
                'name' => 'Futsal',
                'remark' => 'Indoor court'
            ],
            [
                'name' => 'Tennis',
                'remark' => 'Indoor court'
            ],
            [
                'name' => 'Volleyball',
                'remark' => 'Indoor court'
            ],
        ]);
    }
}
