import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
import json

# 1. Set page to wide mode and hide the sidebar by default
st.set_page_config(
    layout="wide", 
    page_title="Road Crash Data Cube", 
    initial_sidebar_state="collapsed"
)

# 2. CSS to hide Streamlit's header, footer, and padding
st.markdown("""
    <style>
        #root > div:nth-child(1) > div > div > div > div > section > div {
            padding-top: 0rem;
            padding-bottom: 0rem;
            padding-left: 0rem;
            padding-right: 0rem;
        }
        header {visibility: hidden;}
        footer {visibility: visible;}
        #MainMenu {visibility: hidden;}
        footer {
            visibility: visible !important;
            display: block !important;
            position: relative; 
            margin-top: 50px; /* Adds space above the footer */
        }
    </style>
""", unsafe_allow_html=True)

def get_html():
    # Load assets
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()
    
    # Load data
    df = pd.read_csv('mergedData.csv')
    data_json = df.to_json(orient='records')

    # Inject CSS
    html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>{css}</style>')
    
    # Inject JS and Data
    js_with_data = js.replace('d3.csv("mergedData.csv")', f'Promise.resolve({data_json})')
    html = html.replace('<script src="script.js"></script>', f'<script>{js_with_data}</script>')
    
    return html

# 3. Render as a full-screen component
# We use st.components.v1.html with height=1000 or a calculated vh
components.html(get_html(), height=1200, scrolling=False)
