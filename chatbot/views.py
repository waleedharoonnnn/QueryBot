import logging
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from .langchain_agent import get_langchain_agent
import asyncio # Import asyncio

logger = logging.getLogger(__name__)

# Remove global initialization
# chatbot_agent = get_langchain_agent()

class ChatbotView(APIView):
    async def dispatch(self, request, *args, **kwargs):
        self.headers = {}
        request = self.initialize_request(request, *args, **kwargs)
        self.initial(request, *args, **kwargs)

        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed

        try:
            response = await handler(request, *args, **kwargs)
        except Exception as exc:
            response = self.handle_exception(exc)

        self.response = self.finalize_response(request, response, *args, **kwargs)
        return self.response

    async def post(self, request, *args, **kwargs): # Make post method asynchronous
        user_query = request.data.get('query')
        if not user_query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            chatbot_agent = get_langchain_agent() # Initialize agent inside the post method
            response = await chatbot_agent.ainvoke({"input": user_query}) # Use ainvoke for async call with correct input key
            return Response({"response": response}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.exception("Error in chatbot API:") # Log the full traceback
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
