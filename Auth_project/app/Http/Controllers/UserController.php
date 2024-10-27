<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    
    public function index()
    {
        // return UserResource::collection(
        //     User::orderBy('id', 'desc')->get()
        // );
        return UserResource::collection(User::all());
    }

  
    public function store(StoreUserRequest $request)
    {
        try {
            \Log::info($request->all()); // Log the request data
            $data = $request->validated();
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);
            return response(new UserResource($user), 201);
        } catch (\Exception $e) {
            \Log::error($e->getMessage()); // Log the exception
            return response()->json(['message' => 'Server error: ' . $e->getMessage()], 500);
        }
    }

   
    public function show(User $user)
    {
        return new UserResource($user);
    }

    
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        return new UserResource($user);
    }

 
    public function destroy(User $user)
    {
        $user->delete();

        return response('',204);
    }
}