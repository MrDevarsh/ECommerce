from django.shortcuts import render
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
import json
from rest_framework import status
import uuid
from django.utils import timezone
from ecom_site import settings
import datetime
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


# Create your views here.

class SessionView(APIView):
    def post(self, request):
        session_id = uuid.uuid4()
        current_time = timezone.now()
        expires_at = current_time + timezone.timedelta(minutes=settings.SESSION_COOKIE_AGE)

        existing_session = Session.objects.filter(expires_at__gt=current_time).first()

        if existing_session:
            # Session is still valid, return the existing session ID
            serializer = SessionSerializer(existing_session)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # Session has expired or doesn't exist, generate a new one
            session_id = uuid.uuid4()
            expires_at = current_time + timezone.timedelta(minutes=settings.SESSION_COOKIE_AGE)

            # Create or update the session record in the database
            if existing_session:
                existing_session.session_id = session_id
                existing_session.expires_at = expires_at
                existing_session.save()
            else:
                Session.objects.create(
                    session_id=session_id,
                    expires_at=expires_at
                )

            # Return the new session data
            new_session = Session.objects.get(session_id=session_id)
            serializer = SessionSerializer(new_session)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class ProductView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class CartView(APIView):

    def get(self, request):
        cart = Cart.objects.all()
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)

    # def post(self, request):
        # if request.headers['Content-Type'] == 'application/json':
        #     cart_data = json.loads(request.body)

        #     # Assuming cart_data has the necessary information to create a Cart object
        #     serializer = CartSerializer(data={
        #         'cart_total': cart_data.get('cartTotal'),
        #         'cart_value': cart_data.get('cartValue'),
        #         'session': cart_data.get('session_id'), 
        #         'tax': cart_data.get('tax')
        #     })


        #     if serializer.is_valid():
        #         serializer.save()
        #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        #     else:
        #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if request.headers['Content-Type'] == 'application/json':
            cart_data = json.loads(request.body)

            print("-------------->>>")
            print(cart_data)

            print("-----------------------")
            print(request.body)
            
            # session_data =[] SessionView.get_by_session_id(SessionView(), request, cart_data.get('session'))
            session_id = 1
            
            # if(session_data.status_code == '200'):
            #     session_id = session_data.id
            
            # Assuming cart_data has the necessary information to create a Cart object
            serializer = CartSerializer(data={
                'cart_value': cart_data.get('cartValue'),
                'tax': cart_data.get('tax'),
                'cart_total': cart_data.get('cartTotal'),
                'session' : session_id,
                'updated_on': datetime.datetime.now()
            })


            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
class SessionView(APIView):

    def get(self, request):
        session = Session.objects.all()
        serializer = SessionSerializer(session, many=True)
        return Response(serializer.data)
    
    def get_by_session_id(self, request, sessionId):
        session_instance = Session.objects.get(Session, session_id='cb093495-5d77-42e2-9bab-53dd1668ddf0')

        session_id = session_instance.id
        
        print("<<<<------------------>>>>")
        print(session_id)

        # Now 'session_id' contains the id value corresponding to session_id '123'
        return Response({'id': session_id}, status=status.HTTP_200_OK)
