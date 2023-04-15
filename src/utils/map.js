import Pbf from "pbf";
import { pburl } from "../config";
import { FeedMessage } from "../controllers/gtfs-realtime.browser.proto";

export const onAdd = (canvas, size) => {
	canvas.width = size;
	canvas.height = size;
};

export const addSource = (map, geoJson) => {
	const size = 50;
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	const pulsingDot = {
		width: size,
		height: size,
		data: new Uint8Array(size * size * 4),
		onAdd: onAdd(canvas, size),
		render: function () {
			const duration = 1500;
			const t = (performance.now() % duration) / duration;

			const radius = (size / 2) * 0.2;
			const outerRadius = (size / 1.5) * 0.4 * t + radius;

			// Draw the outer circle.
			context.clearRect(0, 0, size, size);
			context.beginPath();
			context.arc(size / 2, size / 2, outerRadius, 0, Math.PI * 2);
			context.fillStyle = `rgba(255, 200, 200, 0.2)`;
			context.fill();

			// Draw the inner circle.
			context.beginPath();
			context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
			context.fillStyle = "rgba(255, 100, 100, 0.5)";
			context.strokeStyle = "rgba(255, 100, 100, 0.5)";
			context.lineWidth = 1 - t;
			context.fill();
			context.stroke();

			// Update this image's data with data from the canvas.
			this.data = context.getImageData(0, 0, size, size).data;

			// Continuously repaint the map, resulting
			// in the smooth animation of the dot.
			map.triggerRepaint();

			// Return `true` to let the map know that the image was updated.
			return true;
		},

		// Call once before every frame where the icon will be used.
	};

	map.on("load", () => {
		map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
		map.addSource("vehicles", {
			type: "geojson",
			data: geoJson,
		});

		map.addLayer({
			id: "vehicles",
			type: "symbol",
			layout: {
				"icon-image": "pulsing-dot",
			},
			source: "vehicles",
		});
	});
};

export const getVehicles = async (pburl) => {
	let response = await fetch(pburl).catch((e) => {
		console.error(e);
	});
	if (response.ok) {
		const bufferRes = await response.arrayBuffer();
		const pbf = new Pbf(new Uint8Array(bufferRes));
		const obj = FeedMessage.read(pbf);
		return processVehicles(obj.entity);
	} else {
		console.error("error: ", response.status);
	}
};

export const processVehicles = (d) => {
	const features = d.map((el) => {
		return {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [
					el.vehicle.position.longitude,
					el.vehicle.position.latitude,
				],
			},
			properties: {
				id: el.vehicle.vehicle.id,
			},
		};
	});

	return {
		type: "FeatureCollection",
		features,
	};
};

const updateData = (map) => {
	if (!map) return;

	getVehicles(pburl).then((data) => {
		const vehicles = map.getSource("vehicles");
		vehicles.setData(data);
	});
};

export const getAndLoadVehicles = async (map) => {
	const geoJson = await getVehicles(pburl);
	addSource(map, geoJson);
	return setInterval(() => updateData(map), 5000);
};
