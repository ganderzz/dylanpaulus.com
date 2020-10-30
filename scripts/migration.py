from pathlib import Path
import os, shutil

DIR_PATH = os.path.dirname(os.path.realpath(__file__))
POSTS_PATH = os.path.join(DIR_PATH, "../posts")

all_posts = Path(POSTS_PATH).glob("*.md")

for post in all_posts:
    print("Migrating: ", post.name)
    created_dir = os.path.join(POSTS_PATH, post.name.split('.')[0])

    # Recreate directories if they exists (mostly for debugging)
    if os.path.exists(created_dir):
        shutil.rmtree(created_dir)

    os.mkdir(created_dir, mode=0o766)

    print("Moving ", os.path.join(POSTS_PATH, post.name))
    print("-> To ", os.path.join(created_dir, "index.md"))

    shutil.move(os.path.join(POSTS_PATH, post.name), os.path.join(created_dir, "index.md"))