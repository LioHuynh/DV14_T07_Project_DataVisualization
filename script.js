// ======================== GLOBAL ========================
let fullData = [];
let years = [], states = [], roadUsers = [];
let selectedYear = 2021;
let selectedState = "Australia";
let selectedRoadUsers = [];
let metricMode = "raw";

const width = 700, height = 350;
const margin = { top: 40, right: 80, bottom: 50, left: 70 };

const colourRoad = {
    "Car driver, passenger or unknown position": "#3b82f6",   // blue
    "Motorcyclist": "#ef4444",                               // red
    "Pedal cyclist": "#10b981",                              // green
    "Pedestrian": "#f59e0b"                                  // amber
};
const colourDefault = "#2c7da0";

// ======================== LOAD CSV ========================
function loadData() {
    d3.csv("mergedData.csv").then(data => {
        console.log("CSV loaded, rows:", data.length);
        data.forEach(d => {
            d.year = +d["Calendar year"];
            d.hospitalisations = +d.Hospitalisations;
            d.state = d["State or territory"]?.trim();
            d.roadUser = d["Breakdown value"]?.trim();
            d.breakdownType = d["Breakdown type"]?.trim();
            d.dataLevel = d["Data level"]?.trim();
        });

        fullData = data;

        years = [...new Set(fullData.map(d => d.year))].sort((a,b)=>a-b);
        states = [...new Set(fullData.map(d => d.state))].filter(s => s && s !== "");
        if (states.includes("Australia")) states = ["Australia", ...states.filter(s => s !== "Australia")];
        
        const allUsers = [...new Set(fullData.filter(d => d.breakdownType === "Road user" && d.roadUser !== "Total").map(d => d.roadUser))];
        roadUsers = allUsers.filter(u => ["Car driver, passenger or unknown position", "Motorcyclist", "Pedal cyclist", "Pedestrian"].includes(u));
        selectedRoadUsers = [...roadUsers];

        populateFilters();
        updateAllCharts();
        attachEvents();
    }).catch(err => {
        console.error("CSV load error:", err);
        document.querySelectorAll(".chart-container").forEach(div => {
            div.innerHTML = `<p style="color:red; text-align:center;">❌ Cannot load mergedData.csv. Ensure file exists in same folder.</p>`;
        });
    });
}

function populateFilters() {
    const yearSel = document.getElementById("year-filter");
    yearSel.innerHTML = "";
    years.forEach(y => {
        let opt = document.createElement("option");
        opt.value = y; opt.textContent = y;
        if (y === selectedYear) opt.selected = true;
        yearSel.appendChild(opt);
    });
    document.getElementById("year-display").innerText = selectedYear;

    const stateSel = document.getElementById("state-filter");
    stateSel.innerHTML = "";
    states.forEach(s => {
        let opt = document.createElement("option");
        opt.value = s; opt.textContent = s;
        if (s === selectedState) opt.selected = true;
        stateSel.appendChild(opt);
    });

    const container = document.getElementById("roaduser-checkboxes");
    container.innerHTML = "";
    roadUsers.forEach(ru => {
        let label = document.createElement("label");
        let cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = ru;
        cb.checked = selectedRoadUsers.includes(ru);
        cb.addEventListener("change", e => {
            if (e.target.checked) selectedRoadUsers.push(ru);
            else selectedRoadUsers = selectedRoadUsers.filter(r => r !== ru);
            updateAllCharts();
        });
        let displayName = ru.replace("Car driver, passenger or unknown position", "Car").replace("Motorcyclist", "Motorcycle").replace("Pedal cyclist", "Bicycle");
        label.appendChild(cb);
        label.appendChild(document.createTextNode(displayName));
        container.appendChild(label);
    });
}

// ======================== DATA HELPERS ========================
function getTotalByYearState(state) {
    const filtered = fullData.filter(d => d.breakdownType === "Total" && d.dataLevel === "State/Territory");
    let map = new Map();
    filtered.forEach(d => {
        if (state === "Australia" && d.state !== "Australia") return;
        if (state !== "Australia" && d.state !== state) return;
        map.set(d.year, (map.get(d.year) || 0) + d.hospitalisations);
    });
    if (state === "Australia") {
        fullData.filter(d => d.breakdownType === "Total" && d.dataLevel === "National").forEach(d => {
            map.set(d.year, (map.get(d.year) || 0) + d.hospitalisations);
        });
    }
    return Array.from(map.entries()).map(([year, hosp]) => ({ year, hosp })).sort((a,b)=>a.year-b.year);
}

function getStateComparison(year) {
    const filtered = fullData.filter(d => d.breakdownType === "Total" && d.dataLevel === "State/Territory" && d.year === year && d.state !== "Australia");
    let map = new Map();
    filtered.forEach(d => map.set(d.state, (map.get(d.state) || 0) + d.hospitalisations));
    return Array.from(map.entries()).map(([state, hosp]) => ({ state, hosp })).sort((a,b)=>b.hosp - a.hosp);
}

function getRoadUserTrends() {
    const filtered = fullData.filter(d => d.breakdownType === "Road user" && d.dataLevel === "National" && roadUsers.includes(d.roadUser));
    let map = new Map();
    filtered.forEach(d => {
        if (!map.has(d.year)) map.set(d.year, { year: d.year, ...Object.fromEntries(roadUsers.map(ru => [ru, 0])) });
        map.get(d.year)[d.roadUser] += d.hospitalisations;
    });
    return Array.from(map.values()).sort((a,b)=>a.year-b.year);
}

function getStackedData() {
    const trends = getRoadUserTrends();
    return {
        years: trends.map(t => t.year),
        series: roadUsers.map(ru => ({ name: ru, values: trends.map(t => t[ru] || 0) }))
    };
}

// ======================== DRAW CHARTS ========================
let tooltip = null;
function createTooltip() {
    if (!tooltip) {
        tooltip = d3.select("body").append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0,0,0,0.8)")
            .style("color", "#fff")
            .style("padding", "6px 12px")
            .style("border-radius", "8px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("display", "none");
    }
    return tooltip;
}

function drawBarChart() {
    const data = getStateComparison(selectedYear);
    const container = document.getElementById("chart-bar");
    if (!data.length) { container.innerHTML = `<p style="text-align:center;">No data for ${selectedYear}</p>`; return; }
    container.innerHTML = "";

    const svg = d3.select(container).append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(data.map(d=>d.state)).range([0,width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(data, d=>d.hosp)]).nice().range([height,0]);

    svg.append("g").attr("transform",`translate(0,${height})`).call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    const tip = createTooltip();
    svg.selectAll(".bar").data(data).enter().append("rect")
        .attr("x", d=>x(d.state)).attr("y", d=>y(d.hosp))
        .attr("width", x.bandwidth()).attr("height", d=>height - y(d.hosp))
        .attr("fill", colourDefault)
        .on("mouseover", function(e,d){ tip.style("display","block").html(`<b>${d.state} ${selectedYear}</b><br/>${d.hosp.toLocaleString()} hospitalisations`).style("left", (e.pageX+12)+"px").style("top", (e.pageY-28)+"px"); })
        .on("mouseout", function(){ tip.style("display","none"); });
}

function drawLineChart() {
    const data = getTotalByYearState(selectedState);
    const container = document.getElementById("chart-line");
    if (!data.length) { container.innerHTML = `<p style="text-align:center;">No data for ${selectedState}</p>`; return; }
    container.innerHTML = "";

    const svg = d3.select(container).append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain(d3.extent(data, d=>d.year)).range([0,width]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d=>d.hosp)]).nice().range([height,0]);

    svg.append("g").attr("transform",`translate(0,${height})`).call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(data.length));
    svg.append("g").call(d3.axisLeft(y));

    const line = d3.line().x(d=>x(d.year)).y(d=>y(d.hosp));
    svg.append("path").datum(data).attr("fill","none").attr("stroke",colourDefault).attr("stroke-width",2.5).attr("d",line);

    const tip = createTooltip();
    svg.selectAll(".dot").data(data).enter().append("circle")
        .attr("cx", d=>x(d.year)).attr("cy", d=>y(d.hosp)).attr("r",5).attr("fill",colourDefault)
        .on("mouseover", function(e,d){ tip.style("display","block").html(`<b>${selectedState} ${d.year}</b><br/>${d.hosp.toLocaleString()} hospitalisations`).style("left", (e.pageX+12)+"px").style("top", (e.pageY-28)+"px"); })
        .on("mouseout", function(){ tip.style("display","none"); });
}

let currentHighlight = null;
function drawMultiLineChart() {
    const trends = getRoadUserTrends();
    const container = document.getElementById("chart-multiline");
    if (!trends.length) { container.innerHTML = `<p style="text-align:center;">No road user data</p>`; return; }
    container.innerHTML = "";

    const svg = d3.select(container).append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain(d3.extent(trends, d=>d.year)).range([0,width]);
    const y = d3.scaleLinear().domain([0, d3.max(trends, d=>Math.max(...roadUsers.map(ru=>d[ru]||0)))]).nice().range([height,0]);

    svg.append("g").attr("transform",`translate(0,${height})`).call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(trends.length));
    svg.append("g").call(d3.axisLeft(y));

    const tip = createTooltip();
    roadUsers.forEach(ru => {
        const lineData = trends.map(d => ({ year: d.year, value: d[ru] || 0 }));
        const line = d3.line().x(d=>x(d.year)).y(d=>y(d.value));
        svg.append("path").datum(lineData).attr("fill","none").attr("stroke",colourRoad[ru]).attr("stroke-width",2)
            .attr("opacity", currentHighlight === ru ? 1 : (currentHighlight ? 0.2 : 1));
        svg.selectAll(`.dot-${ru.replace(/\s/g,'')}`).data(lineData).enter().append("circle")
            .attr("cx", d=>x(d.year)).attr("cy", d=>y(d.value)).attr("r",3).attr("fill",colourRoad[ru])
            .attr("opacity", currentHighlight === ru ? 1 : (currentHighlight ? 0 : 0.6))
            .on("mouseover", function(e,d){ tip.style("display","block").html(`<b>${ru==="Car driver, passenger or unknown position"?"Car":ru}</b><br/>${d.year}: ${d.value.toLocaleString()}`).style("left", (e.pageX+12)+"px").style("top", (e.pageY-28)+"px"); })
            .on("mouseout", function(){ tip.style("display","none"); });
    });

    const legend = svg.append("g").attr("transform", `translate(${width-150}, -10)`);
    roadUsers.forEach((ru,i) => {
        let label = ru==="Car driver, passenger or unknown position"?"Car":ru==="Motorcyclist"?"Motorcycle":ru==="Pedal cyclist"?"Bicycle":"Pedestrian";
        let leg = legend.append("g").attr("transform", `translate(0, ${i*18})`).style("cursor","pointer").on("click",()=>{
            currentHighlight = currentHighlight === ru ? null : ru;
            drawMultiLineChart();
        });
        leg.append("rect").attr("width",10).attr("height",10).attr("fill",colourRoad[ru]);
        leg.append("text").attr("x",14).attr("y",9).style("font-size","10px").text(label);
    });
}

function drawStackedBarChart() {
    const { years, series } = getStackedData();
    const container = document.getElementById("chart-stacked");
    if (!years.length) { container.innerHTML = `<p style="text-align:center;">No stacked data</p>`; return; }
    container.innerHTML = "";

    const svg = d3.select(container).append("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(years).range([0,width]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(series, s=>d3.max(s.values))]).nice().range([height,0]);

    const stackGen = d3.stack().keys(roadUsers).value((obj,key) => obj[key] || 0);
    const stacked = stackGen(years.map(year => {
        let obj = { year };
        series.forEach(s => obj[s.name] = s.values[years.indexOf(year)]);
        return obj;
    }));

    svg.append("g").attr("transform",`translate(0,${height})`).call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    const tip = createTooltip();
    stacked.forEach(layer => {
        svg.selectAll(`.layer-${layer.key.replace(/\s/g,'')}`).data(layer).enter().append("rect")
            .attr("x", d=>x(d.data.year)).attr("y", d=>y(d[1]))
            .attr("width", x.bandwidth()).attr("height", d=>y(d[0])-y(d[1]))
            .attr("fill", colourRoad[layer.key]).attr("opacity",0.9)
            .on("mouseover", function(e,d){
                let val = d[1]-d[0];
                let label = layer.key==="Car driver, passenger or unknown position"?"Car":layer.key==="Motorcyclist"?"Motorcycle":layer.key==="Pedal cyclist"?"Bicycle":"Pedestrian";
                tip.style("display","block").html(`<b>${d.data.year} – ${label}</b><br/>${val.toLocaleString()} hospitalisations`).style("left", (e.pageX+12)+"px").style("top", (e.pageY-28)+"px");
            })
            .on("mouseout", function(){ tip.style("display","none"); });
    });
}

function updateAllCharts() {
    drawBarChart();
    drawLineChart();
    drawMultiLineChart();
    drawStackedBarChart();
}

function attachEvents() {
    document.getElementById("year-filter").addEventListener("change", e => {
        selectedYear = parseInt(e.target.value);
        document.getElementById("year-display").innerText = selectedYear;
        updateAllCharts();
    });
    document.getElementById("state-filter").addEventListener("change", e => {
        selectedState = e.target.value;
        updateAllCharts();
    });
    document.getElementById("metric-filter").addEventListener("change", e => {
        metricMode = e.target.value;
        updateAllCharts();
    });
}

loadData();