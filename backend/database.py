import os
from supabase import create_client, Client
from dotenv import load_dotenv

class database():

    def create_user(userID):
        load_dotenv()
        url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        supabase: Client = create_client(url, key)
        response = (
            supabase.table("Users")
            .insert({'id': userID})
            .execute()
        )

    def get_user_data(userID):
        load_dotenv()
        url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        
        key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
        supabase: Client = create_client(url, key)
        response = (
            supabase.table("Users")
            .select("*")
            .eq('id', userID)
            .execute()
        )
        return response.data

    def get_syllabus(userID):
        data = database.get_user_data(userID)[0]
        return data['syllabus']
  

    def get_goals(userID):
        data = database.get_user_data(userID)[0]
        
        return data['goals']

    def get_activities(userID):
        data = database.get_user_data(userID)[0]
        # print(data['activities'].append("hi"))
        return data['activities']
 
        

    def set_user_data(userID, column, newValue):
        load_dotenv()
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
        goals = database.get_activities(userID)
        goals.append(newValue)
        database.set_user_data(
            userID, 
            'goals', 
            goals
        )

    def set_activities(userID, newValue):
        activities = database.get_activities(userID)
        activities.append(newValue)
        database.set_user_data(
            userID, 
            'activities', 
            activities
        )

    def clear_user_data(userID):
        database.set_goals(userID, "")
        database.set_activities(userID, "")
        database.set_syllabus(userID, "")

    