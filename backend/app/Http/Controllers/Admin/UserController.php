<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all());
    }

    public function updateRole(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'Rol actualizado', 'user' => $user]);
    }

    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'Usuario eliminado']);
    }
    public function stats()
    {
        return response()->json([
            'total_activos' => User::count(),
            'total_admins' => User::where('role', 'admin')->count(),
            'en_papelera' => User::onlyTrashed()->count(),
            'ultimos_usuarios' => User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']),
        ]);
    }
}
