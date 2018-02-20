### NOTE: Python 3 only


from bs4 import BeautifulSoup
import requests
import requests.exceptions
from urllib.parse import urlsplit
from collections import deque
import re
from time import gmtime, strftime
import os
from os.path  import basename
#import pypandoc

# from pypandoc.pandoc_download import download_pandoc
# download_pandoc()



app_path="C:\\soft\\xampp\\htdocs\\example_02\\reports\\20171017_loveread_ec"
base_url="http://loveread.ec"
book_id="27664"

