import os
from supabase import create_client, Client

class database():

    def create_user(userID):
        url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        supabase: Client = create_client(url, key)
        response = (
            supabase.table("Users")
            .insert({'id': userID})
            .execute()
        )

    def get_user_data(userID):
        url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        supabase: Client = create_client(url, key)
        response = (
            supabase.table("Users")
            .select("id")
            .eq('id', userID)
            .execute()
        )
        return response.data

    def get_syllabus(userID):
        return database.get_user_data(userID)['syllabus'];

    def get_goals(userID):
        return database.get_user_data(userID)['goals'];

    def get_activities(userID):
        return database.get_user_data(userID)['activities'];

    def set_user_data(userID, column, newValue):
        url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        supabase: Client = create_client(url, key)
        response = (
            supabase.table("Users")
            .update({column: newValue})
            .eq("id", userID)
            .execute()
        )

    def set_syllabus(userID, newValue):
        database.set_user_data(userID, 'syllabus', newValue)

    def set_goals(userID, newValue):
        database.set_user_data(userID, 'goals', newValue)

    def set_activities(userID, newValue):
        database.set_user_data(userID, 'activities', newValue)
