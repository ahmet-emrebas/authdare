package com.authdare.counter_app

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.util.Log


private const val TAG = "MainActivity"
private const val COUNTER_VALUE_KEY = "COUNTER_VALUE_KEY"


class MainActivity : AppCompatActivity() {

    private var incrementButton: Button? = null
    private var decrementButton: Button? = null
    private var resetButton: Button? = null
    private var counterText: TextView? = null
    private var counterValue = 0;

    override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "LifeCycle : onCreate")
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initData(savedInstanceState)
        initViews()
        initViewProperties()
        initListeners()
    }

    /**
     * Initialize the views.
     */
    private fun initViews() {
        incrementButton = findViewById<Button>(R.id.button_increment)
        decrementButton = findViewById<Button>(R.id.button_decrement)
        resetButton = findViewById<Button>(R.id.button_reset)
        counterText = findViewById<TextView>(R.id.counter_value)
    }

    /**
     * Set view properties
     */
    private fun initViewProperties() {
        counterText?.text = "$counterValue"
    }

    /**
     * Add listeners
     */
    private fun initListeners() {
        incrementButton?.setOnClickListener(object : View.OnClickListener {
            override fun onClick(o: View?) {
                counterValue += 1
                counterText?.setText("$counterValue")
                updateTextColor()
            }
        })

        decrementButton?.setOnClickListener(object : View.OnClickListener {
            override fun onClick(o: View?) {
                counterValue -= 1
                counterText?.setText("$counterValue")
                updateTextColor()
            }
        })

        resetButton?.setOnClickListener(object : View.OnClickListener {
            override fun onClick(v: View?) {
                counterValue = 0
                counterText?.setText("$counterValue")
                updateTextColor()
            }
        })
    }

    /**
     * Sync the class properties with savedInstanceState
     */
    private fun initData(savedInstanceState: Bundle?) {
        counterValue = savedInstanceState?.getInt(COUNTER_VALUE_KEY) ?: 0
    }

    /**
     * Update text color when it is more or less than 0
     */
    fun updateTextColor() {
        if (counterValue < 0) {
            counterText?.setTextColor(Color.RED)
        } else {
            counterText?.setTextColor(Color.WHITE)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "LifeCycle : onDestroy")
    }

    override fun onStart() {
        super.onStart()
        Log.d(TAG, "LifeCycle : onStart")
    }

    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        Log.d(TAG, "LifeCycle : onRestoreInstanceState")
    }

    override fun onResume() {
        super.onResume()
        Log.d(TAG, "LifeCycle : onResume")
    }

    override fun onSaveInstanceState(outState: Bundle) {
        Log.d(TAG, "LifeCycle : onSaveInstanceState")
        super.onSaveInstanceState(outState)
        outState?.putInt(COUNTER_VALUE_KEY, counterValue)
    }

    override fun onStop() {
        super.onStop()
        Log.d(TAG, "LifeCycle : onStop")
    }

    override fun onRestart() {
        super.onRestart()
        Log.d(TAG, "LifeCycle : onResume")
    }

    override fun onPause() {
        super.onPause()
        Log.d(TAG, "LifeCycle : onPause")
    }
}