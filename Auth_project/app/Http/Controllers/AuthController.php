<?php

namespace App\Http\Controllers;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function Login(LoginRequest $request){

        $data=$request->validated();
        if(!Auth::attempt($data)){
            return response([
                'message'=> 'email or password wrong'
            ]);
        }
        $user=Auth::user();
        $token=$user->createToken('main')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'token'=>$token
         ]);

    }
    public function Register(RegisterRequest $request){

     
         $data = $request->validated();

         $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password'])
         ]);

         $token=$user->createToken('main')->plainTextToken;

         return response()->json([
            'user'=>$user,
            'token'=>$token
         ]);

    }
    public function Logout(Request $req)
    {
        $user = $req->user(); 
        $user->currentAccessToken()->delete(); 
        return response('', 204); 
    }
}
