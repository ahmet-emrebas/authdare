package com.authdare.youtube_player_app

import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.widget.Toast
import androidx.constraintlayout.widget.ConstraintLayout
import com.google.android.youtube.player.YouTubeBaseActivity
import com.google.android.youtube.player.YouTubeInitializationResult
import com.google.android.youtube.player.YouTubePlayer
import com.google.android.youtube.player.YouTubePlayerView
import java.util.Timer
import kotlin.concurrent.schedule


const val YOUTUBE_VIDEO_ID = "ZxOh_adRamk"
const val YOUTUBE_PLAYLIST = "PLyjgHc47unfT3BIZo5uEt2a-2TWKy54sU"

class YoutubeActivity : YouTubeBaseActivity(), YouTubePlayer.OnInitializedListener {

    private val TAG = "YouTubeBaseActivity"
    private var youtubePlayer: YouTubePlayer? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate")
        super.onCreate(savedInstanceState)
        val layout = layoutInflater.inflate(R.layout.activity_youtube, null) as ConstraintLayout
        setContentView(layout)


        val playerView = YouTubePlayerView(this)
        playerView.layoutParams = ConstraintLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT,
        )

        layout.addView(playerView)

        playerView.initialize(getString(R.string.GOOGLE_API_KEY), this)

    }


    override fun onInitializationSuccess(
        playerProvider: YouTubePlayer.Provider?,
        player: YouTubePlayer?,
        wasRestored: Boolean
    ) {
        Log.d(TAG, "onInitializationSuccess")
        Toast.makeText(this, "Initialized YouTube Player", Toast.LENGTH_LONG).show()
        if (player == null) return
        player.setPlayerStateChangeListener(playerStateChangeListener)
        player.setPlaylistEventListener(playlistEventListener)
        player.setPlaybackEventListener(playbackEventListener)
        youtubePlayer = player


        if (!wasRestored) {
            player.cuePlaylist(YOUTUBE_PLAYLIST)
        }

        Timer("Play", false).schedule(1000) {
            player.play()
        }

    }


    override fun onInitializationFailure(
        youtubeProvider: YouTubePlayer.Provider?,
        youtubeInitResult: YouTubeInitializationResult?
    ) {
        Log.d(TAG, "onInitializationFailure")
        val REQUEST_CODE = 0
        if (youtubeInitResult?.isUserRecoverableError == true) {
            youtubeInitResult.getErrorDialog(this, REQUEST_CODE).show()
        } else {
            val errorMessage = "There was an error initializing the YouTube Player"
            Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show()
        }
    }

    private val playbackEventListener = object : YouTubePlayer.PlaybackEventListener {
        override fun onPlaying() {
            Toast.makeText(this@YoutubeActivity, "Playing", Toast.LENGTH_LONG).show()
        }

        override fun onPaused() {
            Toast.makeText(this@YoutubeActivity, "Paused", Toast.LENGTH_LONG).show()
        }

        override fun onStopped() {
            Toast.makeText(this@YoutubeActivity, "Stopped", Toast.LENGTH_LONG).show()
        }

        override fun onBuffering(p0: Boolean) {
            Toast.makeText(this@YoutubeActivity, "Buffering", Toast.LENGTH_LONG).show()

        }

        override fun onSeekTo(p0: Int) {
            Toast.makeText(this@YoutubeActivity, "Seeking", Toast.LENGTH_LONG).show()
        }

    }


    private val playerStateChangeListener = object : YouTubePlayer.PlayerStateChangeListener {
        override fun onLoading() {
            Toast.makeText(this@YoutubeActivity, "Video Loading", Toast.LENGTH_LONG).show()
        }

        override fun onLoaded(p0: String?) {
            Toast.makeText(this@YoutubeActivity, "Video Loaded", Toast.LENGTH_LONG).show()
        }

        override fun onAdStarted() {
            Toast.makeText(this@YoutubeActivity, "Ad Started", Toast.LENGTH_LONG).show()
        }

        override fun onVideoStarted() {
            Toast.makeText(this@YoutubeActivity, "Video Started", Toast.LENGTH_LONG).show()
        }

        override fun onVideoEnded() {
            Toast.makeText(this@YoutubeActivity, "Video Ended", Toast.LENGTH_LONG).show()
        }

        override fun onError(p0: YouTubePlayer.ErrorReason?) {
            Toast.makeText(this@YoutubeActivity, "Error happened", Toast.LENGTH_LONG).show()
        }
    }

    private val playlistEventListener = object : YouTubePlayer.PlaylistEventListener {
        override fun onPrevious() {}
        override fun onNext() {}
        override fun onPlaylistEnded() {}
    }


}