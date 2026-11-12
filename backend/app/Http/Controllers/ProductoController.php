<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        return response()->json(Producto::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria' => 'nullable|string|max:100',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240', 

        ]);

        $producto = Producto::create($validated);
        return response()->json($producto, 201);
    }

    public function update(Request $request, $id)
    {
        $producto = Producto::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoria' => 'nullable|string|max:100',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]); 

        $producto->update($validated);
        return response()->json($producto);
    }

    public function destroy($id)
    {
        Producto::findOrFail($id)->delete(); // Soft delete
        return response()->json(['message' => 'Producto eliminado correctamente']);
    }
}
