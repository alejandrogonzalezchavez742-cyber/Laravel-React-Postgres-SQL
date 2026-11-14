<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminUsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_list_users(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/admin/usuarios');

        $response->assertOk()
            ->assertJsonFragment(['id' => $user->id]);
    }

    public function test_non_admin_cannot_list_users(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/usuarios')
            ->assertForbidden();
    }
}
