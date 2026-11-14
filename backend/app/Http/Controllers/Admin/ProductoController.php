<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary; // <--- Importa el SDK oficial

class ProductoController extends Controller
{
    public function index()
    {
        return response()->json(Producto::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'      => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio'      => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'categoria'   => 'nullable|string|max:100',
            'imagen'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagenUrl = null;

        if ($request->hasFile('imagen')) {
            // Toma automáticamente CLOUDINARY_URL desde tu .env
            $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
            $resultado = $cloudinary->uploadApi()->upload(
                $request->file('imagen')->getRealPath(),
                ['folder' => 'productos']
            );
            $imagenUrl = $resultado['secure_url'];
        }

        $producto = Producto::create([
            'nombre'      => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio'      => $request->precio,
            'stock'       => $request->stock,
            'categoria'   => $request->categoria,
            'imagen_url'  => $imagenUrl,
        ]);

        return response()->json($producto, 201);
    }
    
 


    public function destroy($id)
    {
        Producto::findOrFail($id)->delete(); // Soft delete
        return response()->json(['message' => 'Producto eliminado correctamente']);
    }
}
