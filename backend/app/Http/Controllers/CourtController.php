<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class CourtController extends Controller
{
    public function getCourt($sport_id, $date)
    {
        $table = DB::table('court_session')
            ->join('session', 'court_session.session_id', '=', 'session.id')
            ->join('courts', 'court_session.court_id', '=', 'courts.id')
            ->select('courts.id as courts_court_id',
                     'courts.price as courts_price',
                     'courts.sport_id as courts_sport_id',
                     'courts.name as courts_court_name',
                     'session.session as session_session')
            ->where('courts.sport_id', $sport_id)
            ->get();

        $boking = DB::table('booking_detail')
            ->join('bookings', 'booking_detail.booking_id', '=', 'bookings.id')
            ->select('booking_detail.court_id as booking_detail_court_id',
                      'bookings.book_date as bookings_book_date',
                     'booking_detail.sessions as booking_detail_session')
            ->where('bookings.book_date', $date)
            ->get();

            $table = $table->map(function($item) use ($date, $boking){
                $item->date = $date;
                if($item->session_session > '19:00'){
                    $item->courts_price = $item->courts_price * 1.3;
                } else if($item->session_session > '15:00' ){
                    $item->courts_price = $item->courts_price * 1.2;
                }
                $isBooked = $boking->contains(function($booking) use($item){
                    return $booking->booking_detail_court_id == $item->courts_court_id &&
                           $booking->bookings_book_date == $item->date &&
                           $booking->booking_detail_session == $item->session_session;
                });
                $item->is_available = !$isBooked;
                return $item;
            });




            $group = $table->groupBy('courts_court_id');

            dd($group);
            $format = $group->map(function($item){
                return[
                    'id' => $item->first()->courts_court_id,
                    'sports_id' => $item->first()->courts_sport_id,
                    'name' => $item->first()->courts_court_name,
                    'price' => 50000,
                    'sessions' => $item->map(function($itemm){
                        return[
                            'sessions' => Carbon::parse($itemm->session_session)->format('H:i'),
                            'price' => $itemm->courts_price,
                            'is_available' => $itemm->is_available,
                            'court_id' => $itemm->courts_court_id
                        ];
                    })
                ];
            });

            return response()->json([
                'status' => 'success',
                'message' => 'success fetch courts',
                'sport_id' => $sport_id,
                'data' => $format
            ]);
    }


    public function registerCourt(Request $request)
    {
        $user = Auth::user()->id;
        $total = 0;
        $sessionsCount = count($request->session);

        foreach($request->session as $sessions){
            $total += $sessions['price'];
        }

        $boking = DB::table('bookings')->insertGetId([
            'customer_id' => $user,
            'book_date' => $request->book_date,
            'session_count' => $sessionsCount,
            'total' => $total
        ]);

        foreach($request->session as $sessions){
            DB::table('booking_detail')->insert([
                'booking_id' => $boking,
                'court_id' => $sessions['court_id'],
                'sessions' => $sessions['session'],
                'price' => $sessions['price'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        
        $booking_detail = DB::table('booking_detail')->where('booking_id', $boking)->get();

        $format = $booking_detail->map(function($item){
            return[
                'court_id' => $item->court_id,
                'sessions' => $item->sessions,
                'price' => $item->price 
            ];
        });


        return response()->json([
            'status' => 'success',
            'message' => 'success post data',
            'data' => [
                'id' => $boking,
                'book_date' =>$request->book_date,
                'session_count' => $sessionsCount,
                'total' => $total,
                'details' => $format
            ],
        ]);
    }
}
