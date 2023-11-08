<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('source_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('category_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('title');
            $table->text('summary')->nullable();
            $table->string('link', 512);
            $table->string('image', 512)->nullable();

            $table->dateTimeTz('published_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
