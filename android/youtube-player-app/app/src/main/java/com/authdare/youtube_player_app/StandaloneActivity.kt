package com.authdare.youtube_player_app

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.authdare.youtube_player_app.databinding.ActivityStandaloneBinding
import com.google.android.youtube.player.YouTubeStandalonePlayer
import java.lang.IllegalArgumentException

class StandaloneActivity : AppCompatActivity(), View.OnClickListener {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityStandaloneBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.btnPlayList.setOnClickListener(this)
        binding.btnPlayVideo.setOnClickListener(this)

    }

    override fun onClick(v: View?) {

        val intent = when (v?.id) {
            R.id.btnPlayList -> {
                YouTubeStandalonePlayer.createPlaylistIntent(
                    this,
                    getString(R.string.GOOGLE_API_KEY),
                    YOUTUBE_PLAYLIST, 0, 0, true, true
                )
            }
            R.id.btnPlayVideo -> YouTubeStandalonePlayer.createVideoIntent(
                this,
                getString(R.string.GOOGLE_API_KEY),
                YOUTUBE_VIDEO_ID,
                0,
                true,
                true
            )
            else -> throw IllegalArgumentException("Undefined button clicked!")
        }





        startActivity(intent)


    }

}