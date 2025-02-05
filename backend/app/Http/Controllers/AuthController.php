<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'fullname' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        if($validation->fails()){
            return response()->json([
                'status' => 'error',
                'message' => $validation->errors()
            ]);
        }

        $user = User::query()->create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        if(!$token = Auth::guard('api')->attempt($request->only('email', 'password'))){
            return response()->json([
                'status' => 'error',
                'message' => 'fail get token'
            ]);
        }


        return response()->json([
            'status' => 'success',
            'message' => 'success regis data',
            'token' => $token
        ]);
    }


    public function login(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'email' => 'required|exists:users,email',
            'password' => 'required'
        ],
        [  
            'email.exist' => 'email not found',
            'password.exist' => 'password required'
        ]);

        if($validation->fails()){
            return response()->json([
                'status' => 'error',
                'message' => $validation->errors()
            ]);
        }

        if(!$token = Auth::guard('api')->attempt($request->only('email', 'password'))){
            return response()->json([
                'status' => 'error',
                'message' => 'fail get token'
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'success login',
            'token' => $token
        ]);
    }


    public function logout()
    {
        $user = JWTAuth::getToken();
        JWTAuth::invalidate($user);
        return response()->json([
            'status' => 'success',
            'message' => 'success logout'
        ]);
    }

    public function invalidToken()
    {
        return response()->json([
            'status' => 'error',
            'message' => 'invalid token'
        ],419);
    }
}
