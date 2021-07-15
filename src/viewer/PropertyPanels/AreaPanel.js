

import {MeasurePanel} from "./MeasurePanel.js";

export class AreaPanel extends MeasurePanel{
	constructor(viewer, measurement, propertiesPanel){
		super(viewer, measurement, propertiesPanel);

		let removeIconPath = Potree.resourcePath + '/icons/remove.svg';
		this.elContent = $(`
			<div class="measurement_content selectable">
				<span class="coordinates_table_container"></span>
				<br>
				<span style="font-weight: bold">Area: </span>
				<span id="measurement_area"></span>

				<!-- ACTIONS -->
				<li style="display: grid; grid-template-columns: auto auto; grid-column-gap: 5px; margin-top: 10px">
					<input id="area_export" type="button" value="export"/>
				</li>
				<div style="display: flex; margin-top: 12px">
					<span></span>
					<span style="flex-grow: 1"></span>
					<img name="remove" class="button-icon" src="${removeIconPath}" style="width: 16px; height: 16px"/>
				</div>
			</div>
		`);

		this.elRemove = this.elContent.find("img[name=remove]");
		this.elRemove.click( () => {
			this.viewer.scene.removeMeasurement(measurement);
		});

		this.propertiesPanel.addVolatileListener(measurement, "marker_added", this._update);
		this.propertiesPanel.addVolatileListener(measurement, "marker_removed", this._update);
		this.propertiesPanel.addVolatileListener(measurement, "marker_moved", this._update);

		this.elContent.find("#area_export").click(() => {
			if (measurement.onExport) {
				measurement.onExport();
			}
		});
		this.update();
	}

	update(){
		let elCoordiantesContainer = this.elContent.find('.coordinates_table_container');
		elCoordiantesContainer.empty();
		elCoordiantesContainer.append(this.createCoordinatesTable(this.measurement.points.map(p => p.position)));

		let elArea = this.elContent.find(`#measurement_area`);
		elArea.html(this.measurement.getArea().toFixed(3));
	}
};