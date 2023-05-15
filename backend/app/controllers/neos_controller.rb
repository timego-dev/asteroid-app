require 'uri'
require 'net/http'
require 'json'

class NeosController < ApplicationController
  def index
    uri = URI("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY")

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
