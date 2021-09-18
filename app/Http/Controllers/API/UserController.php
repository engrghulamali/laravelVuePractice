<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
class UserController extends Controller
{
      /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            // 'bio' => 'required|min:5',
            'name' => ['required'],
            'password' => 'required',
            'email' => 'required|email|string|unique:users',
        ]);
        return User::create([
            'name' =>$request['name'],
            'email' =>$request['email'],
            'type' =>$request['type'],
            'bio' =>$request['bio'],
            'photo' =>$request['photo'],
            'password' =>Hash::make($request['password'])
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $this->validate($request,[
            // 'bio' => 'required|min:5',
            'name' => ['required'],
            'password' => 'sometimes',
            'email' => 'required|email|string|unique:users,email,'.$user->id,
        ]);
        $user->update($request->all());
        return ['message'=>"User updated successfully!"];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return ['mesage' =>'User record deleted successfully!'];
    }
}
