export const voltageChartOptions = {
  "title": "Voltage",
  "axes": {
		"bottom": {
			"title": "Date",
			"mapsTo": "timestamp",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "Voltage [V]",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "500px",
  "width": "100%",
  legend: { enabled: false },
  data: { loading: false },
	zoomBar: { top: { enabled: true }}
}

export const currentChartOptions = {
  "title": "Current",
  "axes": {
		"bottom": {
			"title": "Date",
			"mapsTo": "timestamp",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "Current [A]",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "500px",
  "width": "100%",
  legend: { enabled: false },
  data: { loading: false },
	zoomBar: { top: { enabled: true }}
}

export const powerChartOptions = {
  "title": "Power",
  "axes": {
		"bottom": {
			"title": "Date",
			"mapsTo": "timestamp",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "Power [W]",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "500px",
  "width": "100%",
  legend: { enabled: false },
  data: { loading: false },
	zoomBar: { top: { enabled: true }}
}

export const kWhChartOptions = {
  "title": "Power consumption",
  "axes": {
		"left": {
			"mapsTo": "value",
			"title": "Power consumption [kWh]",
			"scaleType": "linear"
		},
		"bottom": {
			"title": "Date",
			"mapsTo": "timestamp",
			"scaleType": "time"
		}
	},
	"curve": "curveMonotoneX",
	"height": "500px",
  "width": "100%",
  legend: { enabled: false },
  data: { loading: false },
	zoomBar: { top: { enabled: true }}
}

export const typeChartOptions = {
  "title": "Devices types",
  "resizable": true,
	"donut": {
		"alignment": "center",
		"center": {
			"label": "Devices"
		}
	},
	"height": "300px",
  "width": "100%",
  legend: { enabled: true,  alignment: "center"},
  data: { loading: false }
}

export const statusChartOptions = {
  "title": "Devices statuses",
  "resizable": true,
	"donut": {
		"alignment": "center",
		"center": {
			"label": "Devices"
		}
	},
	"height": "300px",
  "width": "100%",
  legend: { enabled: true,  alignment: "center"},
  data: { loading: false }
}

export const kWhPieChartOptions = {
  "title": "Devices power consumption",
  "resizable": true,
	"donut": {
		"alignment": "center",
		"center": {
			"label": "kWh"
		}
	},
	"height": "300px",
  "width": "100%",
  legend: { enabled: true,  alignment: "center"},
  data: { loading: false }
}

export const summaryPowerChartOptions = {
  "title": "Summary power usage",
  "axes": {
		"bottom": {
			"title": "Date",
			"mapsTo": "timestamp",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "power",
			"title": "Power [W]",
			"scaleType": "linear"
		}
	},
	"curve": "curveMonotoneX",
	"height": "500px",
  "width": "100%",
  legend: { enabled: true },
  data: { loading: false },
	zoomBar: { top: { enabled: true }}
}

export const summaryKWhChartOptions = {
  "title": "Summary power consumption",
  "axes": {
		"left": {
			"mapsTo": "kWh",
			"title": "Power consumption [kWh]",
			"scaleType": "linear"
		},
		"bottom": {
			"title": "Date",
			"mapsTo": "timestamp",
			"scaleType": "time"
		}
	},
	"curve": "curveMonotoneX",
	"height": "500px",
  "width": "100%",
  legend: { enabled: true },
  data: { loading: false },
	zoomBar: { top: { enabled: true }}
}