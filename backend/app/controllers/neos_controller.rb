require 'uri'
require 'net/http'
require 'json'

class NeosController < ApplicationController
  def index
    if params[:startDate] && params[:endDate]
    uri = URI("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + params[:startDate] + "&end_date=" + params[:endDate] + "&api_key=DEMO_KEY")
    else
    uri = URI("https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY")
    end

    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    render json: {
        success: true
        neos: data
    }
  end

  def show
    uri = URI("http://api.nasa.gov/neo/rest/v1/neo/" + params[:id] + "?api_key=DEMO_KEY")

    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    render json: data
  end

  def create
  end

  def update
  end

  def destroy
  end
end
