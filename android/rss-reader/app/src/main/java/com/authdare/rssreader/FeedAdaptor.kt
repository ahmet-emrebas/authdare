package com.authdare.rssreader

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView


class ViewHolder(view: View) {
    val itemTitle: TextView = view.findViewById(R.id.itemTitle)
    val itemSummary: TextView = view.findViewById(R.id.itemSummary)
    val itemArtist: TextView = view.findViewById(R.id.itemArtist)
}


class FeedAdaptor(
    context: Context,
    private val resource: Int,
    private var applications: ArrayList<FeedEntry>
) :
    ArrayAdapter<FeedEntry>(context, resource, applications) {
    private val TAG = "FeedAdaptor"
    private val inflater = LayoutInflater.from(context)

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val viewHolder: ViewHolder
        val view: View

        if (convertView == null) {
            view = inflater.inflate(resource, parent, false)
            viewHolder = ViewHolder(view)
            view.tag = viewHolder

        } else {

            view = convertView;
            viewHolder = view.tag as ViewHolder
        }

        val currentApp = applications[position]
        viewHolder.itemTitle.text = currentApp.title
        viewHolder.itemSummary.text = currentApp.summary
        viewHolder.itemArtist.text = currentApp.artist
        return view
    }

    override fun getCount(): Int {
        return applications.size
    }
}