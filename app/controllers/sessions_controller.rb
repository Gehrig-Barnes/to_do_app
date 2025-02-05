class SessionsController < ApplicationController
    skip_before_action :authorize, only: :login
    skip_before_action :authorize, only: :artist_login

    def login
            user = User.find_by(email: params[:email])
            if user&.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user, status: :ok
            else
                render json: { errors: ["Invalid email or password"] }, status: :unauthorized
            end
    end

    def logout
        session.delete :user_id
        head :no_content
    end

    def artist_login
        artist = Artist.find_by(email: params[:email])
        if artist&.authenticate(params[:password])
            session[:artist_id] = artist.id
            render json: artist, status: :ok
        else
            render json: { errors: ["Invalid email or password"] }, status: :unauthorized
        end
end

def artist_logout
    session.delete :artist_id
    head :no_content
end

end
