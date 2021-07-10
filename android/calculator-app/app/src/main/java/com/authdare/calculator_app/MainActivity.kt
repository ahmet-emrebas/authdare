package com.authdare.calculator_app

import android.os.Bundle
import android.view.View
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.authdare.calculator_app.databinding.ActivityMainBinding
import kotlin.math.pow
import kotlin.math.sqrt


val operators = arrayOf("+", "-", "*", "/", "x²", "%", "√", "=")
val numbers = arrayOf("1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00")

const val PREVIOUS_OPERATOR_KEY = "PREVIOUS_OPERATOR_KEY"
const val CURRENT_OPERATOR_KEY = "CURRENT_OPERATOR_KEY"
const val RESULT_KEY = "RESULT_KEY"
const val TEXTBOX_VALUE_KEY = "TEXTBOX_VALUE_KEY"

class MainActivity : AppCompatActivity() {

    private var previousOperator: String? = null
    private var currentOperator: String? = null
    private var result: Double = 0.0
    private var textboxValue: String? = ""

    private lateinit var binding: ActivityMainBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        /**
         * Configuring the view bindings.
         */
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        /**
         * Restoring the state
        restoreState(savedInstanceState)
         */

        /**
         * Setting the value of the textview from restored state
         */
        binding.textbox.setText(textboxValue)

        /**
         * Handler for click event of Input Buttons
         */
        val numberOnClickHandler = View.OnClickListener { view ->
            binding.textbox.append((view as Button).text.toString())
        }

        /**
         * Handler for click event of Operator Buttons.
         */
        val operationClickHandler = View.OnClickListener { view ->
            calculate((view as Button).text.toString())
        }


        /**
         * Configuring the click events of the inputs and operator elements.
         */
        with(binding) {
            listOf(
                button0,
                button00,
                button1,
                button2,
                button3,
                button4,
                button5,
                button6,
                button7,
                button8,
                button9,
                buttonDot
            ).forEach {
                it.setOnClickListener(numberOnClickHandler)
            }

            listOf(
                buttonPlus,
                buttonMinus,
                buttonMulty,
                buttonDivide,
                buttonMode,
                buttonRoot,
                buttonSquare,
                buttonEqual,
                buttonClear
            ).forEach {
                it.setOnClickListener(operationClickHandler)
            }

        }


    }


    /**
     * Make the calculation based on the clicked operator button
     */
    private fun calculate(operator: String) {
        val currentTextBoxValue = binding.textbox.text.toString().trim()

        var valueAsDouble: Double = 0.0
        if (currentTextBoxValue != "") {
            valueAsDouble = currentTextBoxValue.toDouble()
        }

        clearTextBox()

        currentOperator = operator

        if (currentOperator == "CE") {
            result = 0.0
            currentOperator = null
            previousOperator = null
            return
        }

        if (currentTextBoxValue == "") {
            return
        } else {


            if (previousOperator == null) {
                previousOperator = operator
                result += currentTextBoxValue.toDouble()
            } else {
                when (previousOperator) {
                    "+" -> result += currentTextBoxValue.toDouble()

                    "-" -> result -= currentTextBoxValue.toDouble()

                    "*" -> result *= currentTextBoxValue.toDouble()

                    "/" -> result /= currentTextBoxValue.toDouble()

                    "%" -> result %= currentTextBoxValue.toDouble()
                }

            }
            //    "+", "-", "*", "/", "x²", "%", "√", "="
            if (currentOperator == "x²") {
                result = valueAsDouble.pow(2.0)
                displayResult()
                return
            }

            if (currentOperator == "√") {
                result = sqrt(valueAsDouble)
                displayResult()
                return
            }

            if (currentOperator == "=") {
                displayResult()
                return
            }

            previousOperator = currentOperator
        }
    }

    /**
     * Display result in the textbox view
     */
    private fun displayResult() {
        currentOperator = null
        previousOperator = null
        setTextBoxValue("$result")
        result = 0.0
    }

    /**
     * Clear the textbox content (set the textbox's text property to empty string)
     */
    private fun clearTextBox() {
        binding.textbox.setText("")
    }

    /**
     * Set the text property of textbox view
     */
    private fun setTextBoxValue(value: String) {
        binding.textbox.setText(value)
    }


    /**
     * Helper method for restoring the state after any operation that clear the current state.
     */
    private fun restoreState(savedInstanceState: Bundle?) {
        if (savedInstanceState == null) return

        result = savedInstanceState.getDouble(RESULT_KEY) ?: 0.0
        currentOperator = savedInstanceState.getString(CURRENT_OPERATOR_KEY)
        previousOperator = savedInstanceState.getString(PREVIOUS_OPERATOR_KEY)
        textboxValue = savedInstanceState.getString(TEXTBOX_VALUE_KEY) ?: ""
    }


    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putDouble(RESULT_KEY, result)
        outState.putString(CURRENT_OPERATOR_KEY, currentOperator)
        outState.putString(PREVIOUS_OPERATOR_KEY, previousOperator)
        outState.putString(TEXTBOX_VALUE_KEY, binding.textbox.toString())
    }

}


