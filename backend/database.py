import os
from supabase import create_client, Client
from dotenv import load_dotenv


def get_user():
    load_dotenv()
    url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    supabase: Client = create_client(url, key)

    response = (
        supabase.table("Users")
        .select("syllabus")
        .execute()
    )

    return str(response)