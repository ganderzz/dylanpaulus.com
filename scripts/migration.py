from pathlib import Path
import os, shutil

DIR_PATH = os.path.dirname(os.path.realpath(__file__))
POSTS_PATH = os.path.join(DIR_PATH, "../posts")

all_posts = Path(POSTS_PATH).glob("*.md")

for post in all_posts:
    print("Moving: ", str(post))
    created_dir = os.mkdir(os.path.join(POSTS_PATH, post.name.split('.')[0]), 755)
    shutil.move(str(post), created_dir)
    os.rename(os.path.join(created_dir, post.name), os.path.join(created_dir, "index.md"))