# Configuring a custom CORS settings

class CustomCorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Set CORS headers in the response
        response["Access-Control-Allow-Origin"] = "https://my-rolex-price-tracker-bb86e7034531.herokuapp.com"
        response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Accept, X-CSRFToken"
        response["Access-Control-Allow-Credentials"] = "true"

        return response
