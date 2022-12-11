class ArtistsController < ApplicationController
    skip_before_action :authorize, only: :create
  
    def create
        artist = Artist.create!(artist_params)
        session[:artist_id] = artist.id
        render json: artist, status: :created
    end

    def index 
        render json: current_artist, status: :ok
    end

    def show
        render json: current_artist, status: :ok
    end


    private

    def artist_params
        params.permit(:username, :email, :password, :about, :image, )
    end
end
