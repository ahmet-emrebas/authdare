package com.authdare.youtube_player_app

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.authdare.youtube_player_app.databinding.ActivityMainBinding
import java.lang.IllegalArgumentException

class MainActivity : AppCompatActivity(), View.OnClickListener {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.standalonePlayer.setOnClickListener(this)
        binding.normalPlayer.setOnClickListener(this)


    }

    override fun onClick(v: View?) {
        val intent = when (v?.id) {
            R.id.standalonePlayer -> Intent(this, StandaloneActivity::class.java)
            R.id.normalPlayer -> Intent(this, YoutubeActivity::class.java)
            else -> throw IllegalArgumentException("Undefined button clicked")
        }
        startActivity(intent)

    }
}