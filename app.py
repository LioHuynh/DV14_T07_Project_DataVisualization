import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
import json

# 1. Page Config
st.set_page_config(
    layout="wide", 
    page_title="Road Crash Data Cube", 
    initial_sidebar_state="collapsed"
)

# 2. Aggressive CSS to remove ALL margins, headers, and padding
st.markdown("""
    <style>
        #root > div:nth-child(1) > div > div > div > div > section > div {
            padding: 0px !important;
        }
        .main .block-container {
            padding: 0px !important;
            max-width: 100% !important;
        }
        header {visibility: hidden !important; height: 0px !important;}
        footer {visibility: hidden !important;}
        #MainMenu {visibility: hidden !important;}
        
        /* This removes the blank space specifically at the top */
        .stApp {
            margin-top: -60px;
        }
        
        /* Optional: Hide the anchor link icons on titles */
        .element-container:has(#st-custom-html-spacer) {
            display: none;
        }
    </style>
    <div id="st-custom-html-spacer"></div>
""", unsafe_allow_html=True)

def get_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()
    
    df = pd.read_csv('mergedData.csv')
    data_json = df.to_json(orient='records')

    # Inject CSS
    html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>{css}</style>')
    
    # Inject JS and Data
    js_with_data = js.replace('d3.csv("mergedData.csv")', f'Promise.resolve({data_json})')
    html = html.replace('<script src="script.js"></script>', f'<script>{js_with_data}</script>')
    
    return html

# 3. Render
# Height should match the height of your .dashboard class in style.css
components.html(get_html(), height=1100, scrolling=False)
