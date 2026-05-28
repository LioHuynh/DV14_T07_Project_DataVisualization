import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
import json

st.set_page_config(layout="wide", page_title="Road Crash Data Cube", initial_sidebar_state="collapsed")

def get_html():
    # Load assets
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    with open('style.css', 'r', encoding='utf-8') as f:
        css = f.read()
    with open('script.js', 'r', encoding='utf-8') as f:
        js = f.read()
    
    # Load data from CSV and convert to JSON for JS injection
    df = pd.read_csv('mergedData.csv')
    data_json = df.to_json(orient='records')

    # Inject CSS directly into HTML
    html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>{css}</style>')
    
    # Inject JS and replace the d3.csv() call with the local JSON data
    # This ensures the browser doesn't have issues loading external files from inside an iframe
    js_with_data = js.replace('d3.csv("mergedData.csv")', f'Promise.resolve({data_json})')
    html = html.replace('<script src="script.js"></script>', f'<script>{js_with_data}</script>')
    
    return html

# Main Streamlit UI
st.title("Road Crash Hospitalisations Cube")
st.markdown("Australia · 2011–2021 · Interactive 3D Visualization")

# Render the application component
components.html(get_html(), height=1000, scrolling=True)

st.info("💡 Hint: Use your mouse to rotate the cube or click the buttons to switch perspectives.")
