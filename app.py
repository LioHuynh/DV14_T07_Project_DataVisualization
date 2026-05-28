import streamlit as st
import streamlit.components.v1 as components
import pandas as pd
import json

# 1. Page Config - Optimized for mobile/desktop toggle
st.set_page_config(
    layout="wide", 
    page_title="Road Crash Data Cube", 
    initial_sidebar_state="collapsed"
)

# 2. Aggressive Mobile-First Overrides
st.markdown("""
    <style>
        /* Remove Streamlit header, footer and padding */
        header {visibility: hidden !important; height: 0px !important;}
        footer {visibility: hidden !important;}
        #MainMenu {visibility: hidden !important;}
        .stAppDeployButton {display:none;}
        
        /* Eliminate all white space/margins around the app */
        .main .block-container {
            padding: 0px !important;
            max-width: 100% !important;
            margin-top: -50px; /* Pulls content up to cover the hidden header gap */
        }

        /* Specific fix for mobile viewports */
        @media (max-width: 768px) {
            .main .block-container {
                margin-top: -60px;
            }
        }

        /* Ensure the iframe container fills the width */
        iframe {
            width: 100%;
            border: none;
        }
    </style>
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

    # Injecting a "Safe Area" fix for mobile (Samsung S25 notch handling)
    mobile_fix = """
    <style>
        :root { --safe-top: env(safe-area-inset-top); }
        body { padding-top: var(--safe-top); overflow-x: hidden; }
        .dashboard { width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
        /* Scale the cube slightly smaller on mobile to fit the narrow S25 screen */
        @media (max-width: 480px) {
            :root { --cube-size: 280px !important; --cube-perspective: 1000px !important; }
            .hero-copy h1 { font-size: 1.5rem !important; }
            .kpi-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
        }
    </style>
    """
    
    # Inject CSS + Mobile Fix
    html = html.replace('<link rel="stylesheet" href="style.css">', f'<style>{css}{mobile_fix}</style>')
    
    # Inject JS and Data
    js_with_data = js.replace('d3.csv("mergedData.csv")', f'Promise.resolve({data_json})')
    html = html.replace('<script src="script.js"></script>', f'<script>{js_with_data}</script>')
    
    return html

# 3. Render
# Using a height of 1500 to ensure the vertical stack on mobile is fully visible
# without internal scrollbars.
components.html(get_html(), height=1500, scrolling=True)
