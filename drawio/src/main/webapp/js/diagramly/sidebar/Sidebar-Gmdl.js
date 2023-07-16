(function()
{
	Sidebar.prototype.addGMDLPalette = function()
	{
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlBottom Navigation');
		this.addGMDLBottomNavigationPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlBottom Sheets');
		this.addGMDLBottomSheetsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlButtons');
		this.addGMDLButtonsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlCards');
		this.addGMDLCardsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlChips');
		this.addGMDLChipsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlDialogs');
		this.addGMDLDialogsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlDividers');
		this.addGMDLDividersPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlGrid Lists');
		this.addGMDLGridListsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlIcons');
		this.addGMDLIconsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlLists');
		this.addGMDLListsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlMenus');
		this.addGMDLMenusPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlMisc');
		this.addGMDLMiscPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlPickers');
		this.addGMDLPickersPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlSelection Controls');
		this.addGMDLSelectionControlsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlSliders');
		this.addGMDLSlidersPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlSteppers');
		this.addGMDLSteppersPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlTabs');
		this.addGMDLTabsPalette();
		this.setCurrentSearchEntryLibrary('gmdl', 'gmdlText Fields');
		this.addGMDLTextFieldsPalette();
		this.setCurrentSearchEntryLibrary();
	}
	
	//Adds Google Media Design shapes
	Sidebar.prototype.addGMDLBottomNavigationPalette = function(expand)
	{
		var s = "dashed=0;align=center;fontSize=12;shape=";
		var s2 = "dashed=0;html=1;shape=mxgraph.gmdl.";
		var anc = "shape=rect;fillColor=none;strokeColor=none;";
		var fac = 'shape=ellipse;dashed=0;strokeColor=none;shadow=1;fontSize=13;align=center;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;html=1;aspect=fixed;';
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library bottom navigation ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'bottom navigation', 358, 48, 'Bottom Navigation',
				'7VbbjtowFPyaPIJyIVv6yGWhD9tq1fYHTHISW3VyItuw0K/vcexAKKFCu9qquyoRkT3nMo5nYiVIFtV+rVjDP2MOMkjug2ShEI0bVfsFSBnEociDZBnEcUj/IF5diUZtNGyYgtrcUhC7gh2TW3CIA7Q5SA/kTHOw6WGQzJkUZU3jjPqDIqDA2nwTP21uFNNcc9bYiYLM2LCQcoESVdsrKdqfTTMKf0AXqbEGV5vjk2fiLONbBWvWEDAhoEFhOe93RK19kmVfsUrIAwEzlXFhiFfTAyzZtuS9JeJWZXZd3JiG4mkyoxtti73ZBD0uEUsJrBF6nGHVBjLdpq4KR0HDM5I0nvdo/E6CMrC/qkYLeSnWgBUYRX3DJ5Eb7jKSdOrKOAhq7cCJx5h28/JYetKWBl7eYamTC6m/Qtbu5R8V56aSVtyettW+tIYdl1Uux8o3udB6GtrrmtZ2z4eS7f6JjMmZN5rBxrZoWCbq8gEK01O+852dS7YB+YhaGIFnBu0aPvyWsEFjSOYBS3uyuU9o6Tz23a5mObp7lj8/gdyBXcutZomHzeILwnGUuppDB/h5z03+9T8zU4cpkMyIHZzxDznML+HRPuCJfxSFZ/SjbjldCywKDebCoscnucm1kwvXrtgOFb2CL/QtB6YGTqgw/PDxbn6ja4/Jb8K16b/h2ueZNpq+kmknr2Da9MK0X8htm8PLHFu7Hv8P2r9u2en7O2hpevrKdOn9j9Bf'),
			this.addDataEntry(dt + 'bottom navigation', 358, 48, 'Bottom Navigation',
				'7Zddb9owFIZ/TS5B+SAZuxy0ZRetVGm7n0xykli1cyLnEGC/fnbslK+gditslTokJJ/X5/jErx8s4kVzuVkoVpcPmIHwolsvmitEsiO5mYMQXujzzItuvDD09dcL787MBt2sXzMFFb2mILQFLRMrsIoVGtoKJ2SsKcGk+140Y4IXlR6nen1QWsixom/8p8kNQh03JatNoCAlM82FmKNA1a0V+f6nz8nMpJHCJ+hnKqzA1ma4dp1KlpYrBQtWa2GihRq56Xnb6taNSzLd75jkYquFryBaIJ4yPeG2BYpgc9aaTnK+LAAlkNrqlDXPqLQZUTy1ZSXwonRlE6exxsbFc+nOaD1wXg/7Hv2m7yVJYSzec1huCoPNuJCZGLc8A/wRnjqed59zjhv/hpKNcdpI8cUdN2FtlqhZyqviHnLa878/fRMLtgTxiA0njgeY9AveHyUskQjlEFiu2cwldO2c9t08zc0o0QoahczpJ38JmnAYGlfgj4PY1mx7wcV7VLnf5AFUQWI1BYIRb+Gg/xBp7hEezQZ3/UeBf9B+dMQq5nkDdELq80ZeBe/kBN6HVcPTtxEsuyU+Er/x+wA2mr4IbDA5BbaH+NLA9r0uSmx84et2ifj0oVh9n3dtEr6MbnI9dKdH5PpXIDe5MLlrWNasgP/w/nN4p3/2R+Fq9278dnp1uHt1sen7bza/AA==')
   		];
		  
		this.addPalette('gmdlBottom Navigation', 'GMDL / Bottom Navigation', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLBottomSheetsPalette = function(expand)
	{
		var s = "dashed=0;align=center;fontSize=12;shape=";
		var s2 = "dashed=0;html=1;shape=mxgraph.gmdl.";
		var anc = "shape=rect;fillColor=none;strokeColor=none;";
		var fac = 'shape=ellipse;dashed=0;strokeColor=none;shadow=1;fontSize=13;align=center;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;html=1;aspect=fixed;';
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library bottom sheets ';
		var sb = this;

		var fns = [
			this.addDataEntry(dt + 'bottom sheet', 358, 320, 'Bottom Sheet',
				'7ZbRbtsgFIafxrcVgbjJLud0Sau12rQ9wETjE4yKwQLSOnv6gSFpFhwJaUsvqiaKxDnnPyfm+4VMQRZtv9K0ax5UDaIgXwqy0ErZsGr7BQhRYMTrgtwUGCP3K/DyTHUyVFFHNUib04BDwzMVWwiZkDB2J2KipqYBL0cFqajgTLr12s0H7RIbJe1P/ttrJ9jFpqGdDzSsrS9zIRZKKD3MIpvh42VWqyfYV6SSEHpr9RL/yQ3YasOf4QeYMN9n4+OCttCf3fKQivtdgWrB6p2TvPDaNkFBynloa4CzJraRyApRExLs0PtK0C0ixHGgJAH6rQPpBTIhe8JqlMkxwJjaeyBgY6MDR4jnyH9PnJnmosPj6PYNEdAuhmUIj8BihFKw/4PrNOH6FaA7i7TtmT9TV6ytxdWTV2bwdfSW02qGqhSyoI8gvivDLVc+rcPuKo+Tr6m4P6m3vK79Mx0En+O8Q8F0dM0lux/m3+C3cewajTh2GcPKxLA7+aj6PMf4IP2wzIeTEc/wZTy7Tjy7pZKprTV5tjVBnWkcWn6aleX7NS73sOF/N26WGPcAxoBk7h2d5Vx7kH8cOi9+w0M3T7xbKcXc3nGV5x0b5L86sTWZ7jls7gr0ft273GvOha+X86H21939Dw=='),
			this.addDataEntry(dt + 'grid style options', 358, 642, 'Grid Style With Some Options',
				'7Vxbb+I6EP41SHseQPElFx5Lu+152ErV2SPtY5WCC1ENRom7bc+vPzaJKcEOOMSmlC7VSsRxHHu++WbG42F76HL+epOny9ktmxDaQ9976DJnjJff5q+XhNIeDLJJD131IAzEvx68brgLVneDZZqTBbd5AJYP/E7pMylbyoaCv9GqYZIWMyK7Bz00Smk2XYjvYzE+yUXDI1vwn9l/si+A4rqYpUt5kZMxl7czSi8ZZflqLPS4+shuPGdPRN1ZsIV4ZlTNheScvDauZ9VULeaGsDnh+Zvo8lbdHQAUJVGC4hiCCEQBIn2AylFesgmfld1QmJRtM5JNZ9XIEa4WnxZlw3Q9/LsExZdKiGaBIk2gUiwXKHArV9U/L6e/LWd4hYZJ1CRnOfZG5+vVR3ZepuNsMf2nEgl+b/qXLeVE1LyqRQRb80TiOieFuPpViRrYogrNqO6DDOKyLSc05dlvUhu/C4y4JS9mfE6r9Sqk5q9TSevBdD6hA86W9w9p3knzkVlG9QcqHgSDUFN6HOkCBG0FWL3/jmViWuuX94ew9vp+XB+BPT4WhGsArFdhhUmoYXJBM9FwyRYLlhduCWYmTp1laIjjYWxU+o3RpdD2Ua7kV18SSCpBNk7pRTXheTaZyBWtV0DJI39/8sfq6iqGdSV8mWWc/BRd5AxehB56JmIYd9OjtzqfnepN5JjLCoCahujOTakDtBV9uNOzmRgNTIyOnDBasU0ROvEATOwYGDLJbKm7xqoLMtaW1yNO/egIQCWOgRIz4sJ2FScJVugPqyoY94rVsCVWPhxjsPqIdiadFJfLhcHRg0PFjI4+KQEeUAKBY0pxQslyVqJhFbtch2AU2iIwbO2alKp3itbtXBOAPgACGkDfojD4SzSFYSjeibAGmJAg3yIQ1mO/NTkaIz2dJvtjP1PAt6EznlA2b8oCJ7zrbz/iBlc943HLHjIhdws0kY5mGOBrfH0eaILQRNq2aNpusYGeKulmAmfpYsqebX3U6Er+dRSmfQQYu+eJiirwVlShfItb3rTNiPyJK/bYN6DyMW5x0rMk3xBEym9FcTI8O79V6ua5Oy49jfGL5U9n57Y+DExrv+U6beHTbzVJ8ws5rrbJi/N1XI7s23pv5BYni8SFkjzNDPvcTTHXM7DAmeBLZWqkUzCAAdjPKZiY8oGOnE/oARvYNltxvhxyFPxB5INDUE9adHNN8zSjO486mrJKBx6BlIrWLtGEDVxydAaC6/7JR7pWIbQBmSDPuDrSxAF5TedLSgZjNteg/Oxx+wFof7643VARckfygi1SagPop4rdDwD0uDmn1nUdfxzZPkc29JHFMNR6CCTuv4hZ/ArpDENVxlmmMz4MTGuTaJHO+PB914E2ztGeCoVebJyemLhZxds7HdImEYKmsH1axe3bbOCyzGxE0wdC71iR8YzVfJvq/mOrwwPjXNjZBm9oomGtrC06hDZmwNf7bIATjTem+kZ1Stu5cqOK4pRGqHpHtxqhp0D+rnKD3XXiPct4GloB9MAIDC+C8HtTFOVahQwFsoZQFPsp/UGJD5OC9DzNDWNTebg9cmFWVmPdL+lzcVJqdBR1SUIcW5kcZxqDjqExesbo1o0POikXhHeco9jW8aJjuTGDFULQixXCQx/11mqymzpFiiKd6jU2B6hVNdKpaFbf4MdaqxY+jnszZEqxK8WCdcVSVQZuFUtPpd2y3IlWyWFORaVAZK1SR/V1BrsE/NglIRcf6nNSyT+3O+G32gP79sXK63TNDGEfJyJIz/3thmnfIdZDOn7aaYybIDrwEAvtrrkIBlsFzMa0uOlUy9FeNq693ctP9ZDFb64UVuLJbFkY80ofhtD5A9Qi62e0bh+JTnxu8IjL95/8l903/0eA/wE='),
			this.addDataEntry(dt + 'grid style all options', 358, 642, 'Grid Style With All Options', 
				'7Vtdb+I4FP01SLMPRYnt8PFY6NB9mErVzkjzOApgwKqJo8Sdlv31a5OYEuxQh9iFskNViRjbse851+fm2unA8fr1PovT1QObY9qBXztwnDHGi2/r1zGmtAMCMu/Auw4AgfjvgEnNr+H21yCNM5xwmwagaPA7ps+4KCkKcr6hZcE8zldYVg86cBRTskzE95noH2eiYMES/p38K+uGQFznqziVFxmecfkzoXTMKMu2fcHF9iOr8Yw9YfVLwhLRZlSOBWccv9bOZ1tUTuYeszXm2UZUeSFzvipqwGhQNFthslyVzXqonFmcFwXLXds384gvpYXM1oKateScb2Hg1miqflYM/9CI4A4OB706I8q+9ypPth9ZOY1nJFn+U5oEvRX9YKkciBpXOYngYJxQXGc4F1c/S1OHtpCB0yADqCjLMI05+Y0r/beBETUk/YqvaTlfhdT6dSl9trtcz2mXs/TXNM6aImVlO2i2XbXBpnT1blRc71kW9XTDhk0NW97/kRExrN3Nb4agcvubfrUHtljkmGvA7GZhhVWkYXVLiSgYsyRhWe7W8cwOVcUUDlF/2Dc6w17v0mjvuWLhd3KckgNkFtPbcrxrMp/LCe0mQPGCvzX8tr2664MqN19WhOPvooocwIugp2f/jPrtaLSpurlT2vQcu7gCoEIQXdAUG4Ct6SOz6Y84dGhy6J4Th1bOpvx54AGYvmNg8JzYeu4OqzbIWC+8HnG66X0AUAPHQIkRcbF25RcJVuQPqzIA94rVsCFWPnQx2H5EOZMixeV0QfDhMaPyjJaaNAg9oBQGjl2KY4rTVYGGVegyicJRZIvAsLE0Kaq3CuLtpCkEPgAKNYC+9KLgL1EURZG4J0QaYMKC/MCBkB767ZzjzJFec0zNT2aBEy+7OWziBkU9p/HApkRY2QI7qGMXBWiCJsew05e460bT9jk71PMl7Ra8VZws2bOtIo3u5F9LY9rHe333fqJiCHQQQyglces3TdMif6KId9a3UCVf3OKkp0S+QACVSvX6g6E3lTrXSldw89qFS09a/GTZ09XJ1tnAtNYt10kKn7pVZ83/kXA1TVVcr3A5Wt92T0JucbJIUyjLU2J4qt03czXfGjozfEGmWncKuiAI3/cpMDBl/xyJT+QBG9A0N3G9PuQo+APQhw8BPUXRTprWMaFHNzbqckgnbngURGuWVkIGX3K044Gq+uQjOasQ2oNMOM+s3L9EAX6N1ynF3Rlba1B+9rj9BLQ/X9xuOBbyiLOcJTG1AfRTxe5nA9Q2drc53HH2IONEZXIUQIChFy/Q0xL3W3E5Kk91UUNFo5alSB16A5cHKEY0nmL6yHLCCatEJKr6t4MKU8a5WGtrYhiTG1YObPSqrtQG8F1QGaKB5jemkztqA6L1piSs6B4EPo7uGA5h/F0+CLfnxNsj9WWwItRDpXB4G0Rf62Jf1xQyHP0ybMchP7va0I+w6nmYe8aWcidn5GJZ2fb1K6XP+UXR6EPoMohQ32rJccaYwyXHC2P0VNCDGw26KAlCR5KGtkfU4EfJmGEVgsDLKoRUrOeWU3ra6gHnebzUN5RPoFXZ06Uw68agY42phT5G3gxpAeSKWKBKrNBHfAT1nNuYpRsHrJrJbi6FUuCAUYnpwJJOM59kMoofNPHJ0T6I4s+OTz4STVDPDU7EE/6UMX0PsTmnFqqrS+GV/UrlKYSyfWjzFEFF6niNWxLp2cofL4RLXNpziJc9/aFQvap9egI1PfTldSfJbYJuU2nwXrpOLQ9tk9bIi1i4fgluGs+ejsaIdRCduJEEj78ZF3QPjgwbjz6YdpYcpdiqiu/l3Tiop1w1DBVWoiVJc2PgdTaErh8gi9fQjq5u50Snf23wiMu3F+uL6vvv3f8H'),
			this.addDataEntry(dt + 'list style', 358, 642, 'List Style',
				'7Vtbb+I6EP41PLZy7ITAI6W7e7Q6K1XbXZ3HIy8YEjXEkeNe2F+/dm4QbIqzsWkpUFUiju3Y8803MxkPAzRdvXxhOIu+0TlJBujTAE0Zpbz8tnqZkiQZQBDPB+h2ACEQ/wP4ec9dr7gLMsxIyk0GwHLAE04eSdlSNuR8nVQNc5xHRHYHA3SDk3iZiu8zMT9homFBU34f/5Z9PSiu8whn8oKRGZe34ySZ0oSyYi60KD6yG2f0gdR3UpqKMTfVWgjj5GXvfoqmajNfCF0Rztaiy3M851HZAwWjclhE4mVUDRv61c5wXjYsm7Eb8YgvlYT00kKKtOSeJwjYFVrdn5XL3xUivEXj0XCfEOXcW50/Fx/ZOcOzOF1+r0Tib5p+0EwupF5XtQmws04krhnJxdV/lag9U8jg30EG/bKNkQTz+Im05u8Do99R6SO+Sqr91kitXpaSs9fL1Ty55jT7/xdmXZEykh3Sy649YF1R/Toor7ck6w9VwXpdBVs9/47GYlnNw6/GsPX4q7A9A10scsIVYJpdGGEVKFhN5H2bdNPTqI0kGvvhONRSYGt2KapDBCzZJtcpkY9nOJlU613F87ncULOBhCz4ZuC/xdVtCNsa6ZKBQdhPUdZtIltVjKFlEmeMLIiQ2IzkhjrRODMjCAI9BK9QtxZbi7pDK9Stp6mZO3IAUGjbyrIYp8uCIO8BHQ9o+GIHHOC30UEO0BlZRicnmM0iBZttILYBqjArO9fWFPZEy9gpejqnaIdZV8PAPbXG1sHjXHiYoxo+Y7ACd1hB3z1WtZ3YAusrTuW04I6whzjNX8fORTQDio9opzK04HL7EBwKbjxfDW6aiezEMs9RzMm96CKf9yz003V809NgV3oz8lzojWeb5Lx4RTHRj1sR7w4/Gb+Rg87Os36Tbr3ueXa8505oU/PPLjhd8yaHwHnMiSk4IyD/+oJjbH6RxlciS/Y3ADtYOTHAatbmGy5k8JVGaU7Ti/09cfvr1fpoV29sp4nccbxvkuj0Oa6mie6IpCsEU8yS/MLyD8DysZMwy3YeyR3L+75InT7L1ZTSD0aeqKT5PzjNyYXkp07y5rzCruLYzna5I3l49iTvmtx6W1a75FQt356cQsCF44RqXkvBqZZ8Em9le3VibueBPWuCL5VpL53ANQTeYU7BkYZUdrC5cnE0BtXU0QQzGQKDG5KmhPP3zKiLnzThdG0m7SqOmtaaKKoihMLbMEENTE0KcS9Mu8UmitaZwbCnHqjjuWrnWhPD5CN0gZKa0Hqn0cw+cM4nmtHUGt1HQkLHN8DNod2bWFydmT1WEYslixs6cdVq4qofl/NCuzSx1rD4qHrRtP/lWXyp4d1KJ0KNAQZWWL1jU9yc/mhqj35mCcXzc2P16cdRPnQSR9mufXos1ctMJxpGm8l/aCWAOqHCNE3t05Rm6wt5T468Iycu2XZ11Uwql6lH7lcYV6r2WTljpOah7li5DB7FeSGg5dnF26dP7gC58MzIdlVVVujaEeNt1L3aytPllu34a7jzEu3CXyM1K3V8OjektHsEsG4NOEQt31bS2QlMttNSv/DsQccsbUH5/tMEc2btwWhzWNAu7dZSTRcaW/q5VdimmotfWyGDmqcaKzEyznJtruHNEPr4ABnki161bm+JTvjR4BGXm59ql923f8n9Bw=='),
			this.addDataEntry(dt + 'bottom sheet menu items subtext', 358, 360, 'Bottom Sheet (menu items with subtext)',
				'7ZfdbtowFMefJtpVKycGNi4h3Sp1rVRtT2DiQ2LhxJnj8LGn3zl2AoW0Uy82ygWRguzz5eP/+QlExNNye29FXTwZCTriXyOeWmNcWJXbFLSOEqZkxO+iJGH4Rsm3N7yx97JaWKjcexKSkLAWuoVgCYbG7XRnkKIpgMJZxOdCq7zCdYb1waJhaSr3U/2m2DjBfVOImjYWMkdupXVqtLG+Fl/6h8KcNSvoPZWpIORKs+lOwgKtbdQafkAT6pO1axesg+2bV/am7r73YEpwdochGyVdESL4+EtIK0DlRZfGJ0ErJppgyPe5BwVx0Yn4uqB8IGgqrFosQFTenAmnDC4nmuSRao3L3PmbBRMJejSAya/W9I6bIMUMA+Kk3h6caMj2Mh+MfOqfl6Zw2qzN24bOibFhdoMvtR06wCuGJo4bQ/NRuyeY9IMvtznRfJuXUt+qUuQwGDf2xfzzF0B60DQs6TgtFqCfTaO8eohXGNucSFCZ0I8n/lJJSZ3tA2Zdvb2jqUWmqvzR17+L2QnLI9wXrtS0fi93yevc9QnjkLHrgrvtCypHbAjl6B8wORow+SwW2lBVQsAVgJ9IaFbQ4aZt4MP5fGg1SRdPezpHVzrPSef0fHSOB3R2wx854nEDsIJK9rA+GNh9ai6FT99iSnwyEvBK6PkIjSfnQ3QyQPQJcqKQzZV1hRS7CwCyom/xZHrl8YN+z/n5ePw85FGtaPw4TVHWAZ/vVjVOVR7TDUiJ4lwKpfwK6cdAytl/gxS3h7+t3nf0r/YP'),
			this.addDataEntry(dt + 'deep linked modal bottom sheet', 358, 642, 'Deep-linked modal bottom sheet',
				'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'),
			this.addDataEntry(dt + 'long list', 358, 642, 'Long list',
				'7Zpdb5swFIZ/DZeNjIEQLvPRdNNarVon7bIi4ACqwQhol+zXz8aQQgyt02A2RU1VKZhjY5/n9bE5jmYs491N5qbhHfER1oxrzVhmhBT8W7xbIow1CCJfM1YahID+a3Ddc1cv74LUzVBSyFSAvMKLi58RL+EFebHHVYHv5iFi5kAzFi6OgoR+92j7KKMFW5IUD9EfZqtDep2HbsouMuQV7HaE8ZJgkpVtGdvyw8yKjDyh+k5CElpnUfUFZQXa9Y6nLKoGc4NIjIpsT01+R34RcgvDmvFqIYqCsKo2NauRuTkvCA51X91Dv1Qe6vaWIXiLjXlugGGdVttnvPvHTgSObcyv+5zI2m4Yr8sPM05dL0qCH5VLzNeinyRlHan7VQ0CHPXToNcZyunVr8rVuiwy+DFk0ORlGcJuEb2gVvvnYDRPFH1YxLgab00q3gVszk6C2MeTgqSPGzc7lZSU74xu37Ur7KupPrH4dcOz5lR0rH6qY6vn35OIduvw8CsHth5/ZbdbINttjgoBzGEUUqwsxQGqew4dY5ytlvPR9T8F52Hat6fRoFimA0+hNENbRD3moVwWysy0pkAWgfUugtpNrYkyHWSi1M3UQIACIPbAQHLkZl4osGg6vgmkYsSN6wkCz6TTrtBgpXcFtWFYXdmGelizgWGxWDbqvOkn0xHHhiJjmOrJOAKZ7ylKmEEiIDp1JamK6hUKo20h7tdmgP0drVtmWwMDLToQABEWPHPRqTsEWqwcRwGr+hkNWN8QSns5tabME7OUmzFrc2GDhUgOuxuE70keFRFpbtcZmMhz8e3R/Tjyfdang8G8au9wo9qQ35btr+BYMhhLBbqpYiui64IMviYbspPTQVSafgqBWcDRhOAoEYKYzPjiJgF5pmujlBZCbi27kK4d27IuVw1dYQGqUANUExbEZM0dynOUBPS1UEoO8cH8MzyMGh6gmvAgpn1uCAmoQ+FCThBBaf6Y4mfZzTZlQd/tL1cSo20dDDUxQswuPYQIya4XObeVkwLU5+bUvFgpdL2SDyUF2JaCmuggZrRWxJMUgs8s5WRgrmfX68uNCOPJwFQTEcQ82gOOfCQbEbit5H7BWjg6+JTC+VJQExHELN19SAoiKYWU214q3fGWfkvNRBczfQJX9QdL5Wfwg6V9q8J7x0zm7Dxq9elf3c6gmKCY43sb03up8o3rPXWdahx+mdCH6INHG1xnvRl0MKlPON84w63fXFSc4dqtpys5woVigq43hNKaUZqj/4rQ5QMSE2e9gDqj27+kY18aHnr5+vsvbt78edhf')
   		];
		  
		this.addPalette('gmdlBottom Sheets', 'GMDL / Bottom Sheets', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLButtonsPalette = function(expand)
	{
		var s = "whiteSpace=wrap;html=1;dashed=0;align=center;fontSize=12;shape=";
		var s2 = "dashed=0;html=1;shape=mxgraph.gmdl.";
		var anc = "shape=rect;fillColor=none;strokeColor=none;";
		var fac = 'shape=ellipse;dashed=0;strokeColor=none;shadow=1;fontSize=13;align=center;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;html=1;aspect=fixed;';
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library button ';
		var sb = this;
		
		var fns = [
			this.createVertexTemplateEntry(s + 'rect;fillColor=#e0e0e0;strokeColor=none;fontStyle=1;shadow=1',
					100, 36, 'NORMAL', 'Raised Button (Normal)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#e0e0e0;strokeColor=none;fontStyle=1;shadow=1',
					100, 36, 'HOVER', 'Raised Button (Hover)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#e0e0e0;strokeColor=none;fontStyle=1;shadow=1;',
					100, 36, 'FOCUSED', 'Raised Button (Focused)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#e0e0e0;strokeColor=none;fontStyle=1;shadow=1',
					100, 36, 'PRESSED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#000000;strokeColor=none;fontStyle=1;opacity=12;fontColor=#BDBDBD;',
					100, 36, 'DISABLED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#2196F3;strokeColor=none;fontStyle=1;shadow=1;fontColor=#ffffff;',
					100, 36, 'NORMAL', 'Raised Button (Normal)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#2196F3;strokeColor=none;fontStyle=1;shadow=1;fontColor=#ffffff;',
					100, 36, 'HOVER', 'Raised Button (Hover)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#2196F3;strokeColor=none;fontStyle=1;shadow=1;fontColor=#ffffff;',
					100, 36, 'FOCUSED', 'Raised Button (Focused)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#2196F3;strokeColor=none;fontStyle=1;shadow=1;fontColor=#ffffff;',
					100, 36, 'PRESSED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;strokeColor=none;fontStyle=1;opacity=12;fontColor=#BDBDBD;shadow=0;',
					100, 36, 'DISABLED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=none;strokeColor=none;fontStyle=1;shadow=0;',
					100, 36, 'NORMAL', 'Raised Button (Normal)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#999999;opacity=20;strokeColor=none;fontStyle=1;shadow=0;',
					100, 36, 'HOVER', 'Raised Button (Hover)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#999999;opacity=20;strokeColor=none;fontStyle=1;shadow=0;',
					100, 36, 'FOCUSED', 'Raised Button (Focused)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#999999;opacity=40;strokeColor=none;fontStyle=1;',
					100, 36, 'PRESSED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;opacity=26;strokeColor=none;fontStyle=1;opacity=12;fontColor=#BDBDBD;shadow=0;',
					100, 36, 'DISABLED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=none;strokeColor=none;fontStyle=1;fontColor=#ffffff;shadow=0;',
					100, 36, 'NORMAL', 'Raised Button (Normal)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#cccccc;opacity=15;strokeColor=none;fontStyle=1;fontColor=#ffffff;shadow=0;',
					100, 36, 'HOVER', 'Raised Button (Hover)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#cccccc;opacity=15;strokeColor=none;fontStyle=1;fontColor=#ffffff;shadow=0;',
					100, 36, 'FOCUSED', 'Raised Button (Focused)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=#cccccc;opacity=25;strokeColor=none;fontStyle=1;fontColor=#ffffff;shadow=0;',
					100, 36, 'PRESSED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;fillColor=none;strokeColor=none;fontStyle=1;opacity=12;fontColor=#BDBDBD;shadow=1;',
					100, 36, 'DISABLED', 'Raised Button (Pressed)', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			this.addDataEntry(dt + 'dropdown menu', 100, 180, 'Dropdown Menu',
				'3VbJTsMwEP0a3504ReUIgfYCElIPnK1kEls4ceSYpuXrGcfumkYqlEVgKZLnzWLPexPJhKXVam54Ix51Doqwe8JSo7X1u2qVglIkpjIn7I7EMcWPxLMRb9R7acMN1PachNgnLLl6BY94oLVrFYCctwJcOCXslitZ1rjPsD4YBApd24V8c7FRjHYreOMMA5l1bqlUqpU2fS1W9MuFWaNfYM8D/fIFct25cmiE24GxsBrtsIdCe3PQFVizxpBO5laECOpZoAJkKTZp0wDy1gPlNndHGG4CZ6f5YwP+FpZbQCgaEIk92MDYXuOzWUKnrlfXpcy4ugkUVzLPVc9IwzNZlw9QuJtH7Ij1BG0DLVrPoWNXrRPSwgIzXUyH84WYsJX6CLHx54hNJh4zoLiVSziofwnZySjZw6k9TTbt14VkH830dnL/tgjhiCct8eSYrg/LbDJ0UbRgB6JtL3aWjpNRHdlP6vgf9bqm36DX1aheye/q9be0idgX/Exo7l4HPnz/8fAO'),
			this.addDataEntry(dt + 'dropdown button', 100, 30, 'Dropdown Button',
				'xZTvaoMwEMCfJh9XrOkeoHVbv3Qw6BMEPU1YNBJvre7pdzHRam1hY4MFhNz/3C8XGU/Kdm9FLV9NBprxZ8YTawz6XdkmoDWLI5Ux/sTiOKKPxS93rOveGtXCQoXfCYh9wEnoD/Aar2iw00GRiUaCc48Y3wmtior2KeUHS4rcVHhUn853HZPcSFE7wUKKzqy0Tow2ts/F8345N7TmHSaWtF9kOUuFcKxF6rKcCQzpJJbaFaBtOC9YhPZuz70qNLwHUwLajlzOKkMZPCLPJZKgChnCNkEnGi8XY+iFIG0CxNtA+QLo1iqhF1Tp+BjwTShE/SK9a1ClQm8D71JlmQvdNURGVcUBcnfoNb+6gs0fEYz/j+DmhyM5aW0YvrIt3ItaFWWmV0j8q6KHdzWN48zNp7EyFfyS0zygCy9x9ejlGcUlxOBlQQtUJ5ilugU2lH8zik411n4Y8nSDPJQfcpg8bwAXVzO2ceu2SLz8nLz79N/1BQ=='),
			this.addDataEntry(dt + 'dropdown button editable', 100, 40, 'Dropdown Button (Editable)',
				'xVVZboMwED0Nn4mMTQ6Q0Db9aKVKOYEFA1g1GBk3IT19x+AQloRStVItIc1qz7w3xh4L83qveZm9qhikxx49FmqlTCvldQhSepSI2GMPHqUEP48+3fH6jZeUXENhliTQNuHI5Qe0ltZQmbN0hphXGdhw4rEdlyItUI5wf9BoSFRhDuLTxvoU9SrjpVU0RMa6hZShkko3e7GkWTbMaPUOPU/ULPS4gkAbqO821ZhcR3tQORh9xpCTiE3mIkjbOMlApJlLC5yNV62edqlXiFBwKN1GjE0Q22rB5QQ2LN84fHptkmah3TYoIi63DtBcxLFN3VUlj0SRvkBii/bZCOMA9czk0soonjJh4IAp1nnCMepxJJstlgFK/w/Q4PsRnBmqQhUwO08aKoTu+VK0/0tEhgk9fIIZeDRIbsQRBrm3MHPnvSmBZXSHrcYwqySpwExA7spchPvmh1e/N3UXPvI6tX+udZrHcm3wGhRpM8OjW99xMWTJUbeIjWCWDbJ2zZxH+mB+p/xs/oae4eErejn9N3Shen0F2vD+I/EF'),
			this.addDataEntry(dt + 'dropdown button selected', 100, 150, 'Dropdown Button (Selected)',
				'7ZbJTsMwEIafJkeqJG6BKw3LBSSkSnA28SSxcOLKMV14esZLuiQUGtpKCGGpUjyeGXv+b5wmIEm5uFN0WjxIBiIgNwFJlJTaPZWLBIQI4pCzgFwHcRziL4hvd6xGdjWcUgWV3icgdgEzKt7AWZyh1kvhDYzWBRj3MCBjKnhe4XOK+UGhIZOVnvB34xvFOK8LOjUTBak2y1yIRAqpbC6S2WHctJKvsLGS2uESMDk36XDiTwdKw2Jnhdbky7sDWYJWS3SZc6YL7xE6FcICeF40YSNvpLUz5KvYtWD44DX7XD/S0e9KcSo6IrZlQdU2ig/tQLuplKdUXHmZS86YSTGupzTlVX4PmTl9RFrKD7+UtIEmbPRYQY1hz14eI/O84BomuIVJNsdmRFuhS9GHQvwzCkNvUyCo5jPYyn8ImWHPzt6ot4FVLnJzMQd5ycRAI9cqtzBaTb1u3S0ClaxgX/HI5+JtByz9hR6M3HxL2q6yo57C+u0fJcdTrfY+a/Ism3mzfZNDZlkNuoNmVcZetEYdWgl27Yvi392kVm+f4mK1cIMdu3D/qstF+l6uVg945u0X5VGIn3eJyzfF8U+lTRyFORXav0jr8hS0Ljq0nkAxWtF/WofRiqIj4MLp+pPRuW9+UX4A'),
			this.addDataEntry(dt + 'dropdown button selected editable', 100, 150, 'Dropdown Button (Selected, Editable)',
				'7ZbfT4MwEMf/Gh5dgDL11aHOB01MTPS50gMaC11KdZt/vVdaNn7onA4TH9aEhF5719730x54JC5Wc0UX+Z1kIDxy5ZFYSantW7GKQQgv9DnzyKUXhj4+Xnj9xWhQj/oLqqDU+ziE1uGNilewFmuo9Fo4A6NVDma675EZFTwr8T3B+KDQkMpSP/B3MzcIsV/ldGE6ChJthrkQsRRS1bFIWjczTSv5Aq2RpG42AJNLEw47bnegNKy+zLA2ufTmIAvQao1Tlpzp3M3wrQp+DjzLG7epM9LKGrKN71YwfHGafa4fGeh3oTgVAxH7sqBqreT9uqHdZMoTKi6czAVnzISYVQua8DK7hdTsPiA95aOdkjbQRO09U1Ch25OTx8i8zLmGB1zCBFviYURbrgvxEwrh7yhEzqZAUM3foBP/EDLR9yd7x1ktZQk7NbUi3jSZ7C0T+VymrkNLtGgMzdx695LjNjaLnUS9CyDTtAI9EHmzzb10n/6worTOWcOjWGWmIE6ygomJxvtUZvUl6BWTbcnoUHLo9qIR7aThT1wy616/c6iHfKbj4OkufhI2q4+K63SAK8Zy8az4gBrq+Fel619VJHLg7XK8+l+XUWidDWnJV8XxS3ykdRCt87+gdT6g9QiK0ZIeaR1GKwhGwIXd7X+2nd7+Df8A'),
			this.addDataEntry(dt + 'persistent footer button', 300, 40, 'Persistent Footer Buttons',
				'5ZXRbsIgFIafhnsK1mW3dtOrbRe6ByByFDJaGsrWuqffKTC124xeTG9K0uSc/+en8IUEwouyWzhRqycrwRD+SHjhrPWxKrsCjCGMakn4A2GM4kfY/ISbBZfWwkHlLwmwGPgQ5h2iEoXG70wSGiXqvnSwxiVnG21MYY11weWbMFBvvLNvcORAGL2jhLQtihSb9D9wHrqTew5S2vACbAne7XBKq6VXcQan8VxUgd6qFJskTTSx3+6jBwJYJAh/A+G/gMxeV6uX53NYhsevbAU/WH1LtvJL/dknM5b6I2gsu5/OOepSNApkgtYq7WFZi3Ufa/GyoKZ8afpFLmXKzjK9y6+DdDIypN0Q5w0I5+MknOX0Zoin40S8v1v/jxjbwzsXvMEz+AU='),
			this.addDataEntry(dt + 'persistent footer button fixed', 300, 40, 'Persistent Footer Buttons (fixed)',
				'7ZbfbsIgFMafhnsK1mW3dtPd7E+iewBiT4WMlgaYrXv60YLaTo1NzMyW2KQJ5zucA/y+NgHRJK9nmpX8WaUgEX1ENNFKWT/K6wSkRASLFNEHRAh2LyLTE9mozeKSaSjskALiC9ZMfoJXvGDsRgbBcFY2Qw1L13KSCSkTJZVuszRrH6cbq9UHdDLQPk2Gs1RVTsQuCOuBtlCf3HMrhQ3PQOVg9cZNqURquZ9BsT8X5iBWPJSNgsaMj1e70j0BNwgQjgOhB0Am74vF68s5LP3jF6qAH6y2kirsXHw1lREJcQcaie7HU+r0lBkOaYCmwbiSp+1RIydxm8swrLiwMC/ZsmlauU9pKGZyFvNdfJqyBsmsWEOv/SXoR/8E/THeHTv+EvqwwpsSbmGC637rbYXKMgP2wKrdvga5F9/cu457UYx/wb7xzb7r2Lf7Uy6xz4X7O4Kf3r1CfAM='),
			
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), 'shape=ellipse;fillColor=#FF4081;strokeColor=none;shadow=1;aspect=fixed;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(20, 20, 16, 16), s2 + 'plus;strokeColor=#ffffff;strokeWidth=2;shadow=0;sketch=0;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'edit;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'star;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 19, 20, 18), s2 + 'heart;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 19, 20, 18), s2 + 'reply;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 20, 24, 16), s2 + 'users;strokeColor=#ffffff;fillColor=#737373;strokeWidth=2;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'gps;strokeColor=#737373;fillColor=#737373;strokeWidth=2;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'share2;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'navigate;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'chat;strokeColor=#737373;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(22, 18, 12, 20), s2 + 'voice;strokeColor=#737373;fillColor=#737373;strokeWidth=2;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(20, 16, 16, 24), s2 + 'google;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 20, 24, 16), s2 + 'video;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 17, 24, 22), s2 + 'gallery;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 17, 24, 22), s2 + 'birthday;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 20, 24, 16), s2 + 'cloud;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(20, 20, 16, 16), s2 + 'x;strokeColor=#737373;strokeWidth=2;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(22, 18, 12, 20), s2 + 'bookmark;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'calendar;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(17, 20, 22, 16), s2 + 'attractions;strokeColor=#ffffff;fillColor=#737373;strokeWidth=1;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(20, 18, 16, 20), s2 + 'dining;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'education;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'family;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 19, 20, 18), s2 + 'health;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'office;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'promotions;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'radio;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'recipes;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'sports;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 56, 56), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(18, 18, 20, 20), s2 + 'travel;strokeColor=none;fillColor=#737373;direction=south;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 56, 56, 'Floating Action Button');
			}),
			this.addEntry(dt + 'floating action button mini', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 40, 40), fac);
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(12, 12, 16, 16), s2 + 'plus;strokeColor=#737373;strokeWidth=2;shadow=0;sketch=0;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 40, 40, 'Floating Action Button (Mini)');
			}),
			this.addDataEntry(dt + 'toolbar',  358, 64, 'Toolbar',
				'7ZbLbsIwEEW/JstGjkP6WBZaWFWq1EXXVjKJrdpxZBsK/fqOY/MIDxUJVm1BRPadmdxx5gglySdqOTOs4y+6Apnkz0k+MVq7sFLLCUiZUCKqJH9KKCX4S+j0RDTro6RjBlp3TgENBQsm5xCUIFi3klGwnHV+aaDEW45rIeVES236aF73H9StM/oD1pFWt1gzbgwT2Mmeaj/AlRz3GW44K/ncwIx1KIxQ6LRoHZjnBRZa1Ig31a2bMiXkCoVHU3LhsBuLjT6xecMxPSa96bkpfbfcuQ7jRf6IFzy+v/gEmzZaNxJYJ2xaatUHStunTutggcuBSUHH+zbiy5tQ31t8gmAcLE9OoZfiCGagFTiDPuRTVI6HjLy4D2UcBFoF8XYUNGbDvtmUbmeKizjW4yPOfx5xxSyHKj5r7pSMs1mPXi0bT2jaqEqmJVNg2MHEd1nYY+Su/24q3uOh6S4K5M+gQI+jEAtISotQs1oLcb/DCh0dopJFfAxI5sQCBv7H+IktvPpnvPW/yejA/uZheAdd1xbcAX+bg5yF5OjKSC5EBfrUf9A/jBfA+PtZLK7MYsOkBG/+T+PVabw7A0dyiON6pBfjSIY4ZtnlPOJ2+7YX0ndfBr8B'),
			this.addDataEntry(dt + 'floating action button', 50, 156, 'Floating action buttons',
				'7VdNj9owEP01OS5ynI/S4y7ZcKpUqYeercSJrXViyzYs9Nd3HJuPELalAqpKJRLRzJsZj+N5PEiULLrNUhPFvsiaiih5jZKFltJ6q9ssqBARRryOkiLCGMEnwuUH0XiIIkU07e0lBdgXrIlYUY94wNitCIBhRDkTCrkyYL0Yq+UbXUghNeC97B3YcCF2UISTIi6SInXJjNTyHcAYnFaTmsPWTmrNG7UVAx+Bw0jFVpouiYr8Ckry3lL9uoZCE5Ia2duSdFxsAXjWFeOWVhDFqCCrlkF6SPomV7py22fWKohnyTPc4DzczSWYWStlKyhR3Mwq2Q2BygypZeNbgDlqkuGX0zb8h2uC3d7CkVJt6ebDsQxQmMmSyo5aDX1QKJj7gndeW+aR1M8RMcqh7xgjxvvtfp3DxMEIQz9PgOT3BKiJYbTeTcd2IgxzR4xu0zr+ztquFnCCajuhCPAhH64pT/a4r/genhj/n6zAv2QFmmW+ZHviH/EkxlOexLnHNBXE8jUdtT9HnrCDr+6ID+2f8lH3p/l4Adk0htoJ9/aPcREd04ce/cN6FCafob8mT9mN5UlpR+nLKPOQpmOCpNdL0/x+0vT5/tKU30uayjJF8/ghTX8oTWHWMZqqUZZPmbbDrlGjTzdWo825f0rNcD1k5+hbd53snCHDrWRn/Lt4C9kB9/D259OPXw5/Ag=='),
			this.addDataEntry(dt + 'related actions', 200, 40, 'Related actions',
				'7VdNj9owEP01OS5KnBDoEdiFSyut1EPP3mQSW+tkItuw0F/fSWy+sypqoap2ARF53sxjPM7LkxLEs2q90LwR3zAHFcRPQTzTiNatqvUMlApYKPMgfgwYC+kXsPk72ajLhg3XUNtLCMwRVlwtwSEOMHajPGAEb9olEWVjaDU1VuMrzFChJrzGugULqdQWClhcdJ+2WPAc3wiMKCg1zyVt7YRrXsFmguKQAsEzsdSw4A0BCQENytqCfloR0fiiAms755VUGwImOhPSQkZZFj7yZSmo3Bd9x6XO2u0LaxvKD+MJXeg82ktbYAYlYqmAN9IMMqy6RGa60nnhWtDyqMmQTU/byJ9tE9YNYCvl51X8BdQzGmkl1oRlUDvOCrSVGVdfTwpe0FraQzzlSpa9jIlPWKTzmfrbRzlYvyuBDvL3fwFYgdU0U/gmcytcReJUEgqQNNUxxo2Lyx1zrydaeEn1yyv+vbxybgTk23u/P7qt7Kp12T4dg7LK1SDH7Ex/h2I7EeGo++4YP/zA7MNJ7iIZsH4ZeEI4GDrK5iQ+kEmUnMskSh2mQXErV3DUvk87fgfP7RHv2z+Mjro/jI//AIvCgD2T3m6Mi9SY3M3u05qdJ4zDM1HfyvuGV/Y+02jgORHoObh74B96YPL3HpjezgO/3N4D07sHfnYPjNJ/Z4Kja5tgr/31K3LvfB9KbRcpIP2vfW58dZ+jcP/S7MoP36l/AQ=='),
			this.addDataEntry(dt + 'floating action button', 50, 456, 'Floating action buttons',
				'7ZhLj5swEMc/DcdGxOR1zWOTSyut1EPPXhiwtQYje5JN+uk7xibv3SK1ilYtIJDnPzOeMfzwgShZlvuN4bX4pjNQUfIUJUujNfpRuV+CUhGLZRYlq4ixmK6Ird/xDhtvXHMDFXZJYD5hx9UWvOIFiwcVhIxbAS48jpKFwJJ6XA1paAWvXUi5L1z7g6LM1GBrwTgfGv0KS600WatKVxS4yKVSrRSxZBa700+U6bcwK82VSWr+Kte+AqaibYKnYmtgw2sSRiTUWlYI5mlHiTYE5brCNS+lOpAwN6mQCCl5Wbzi20Jg06cL+q63JnULEYg1+cfJnG70xNzNBdhBoXWhgNfSDlJdNo7UNqHr3Jeg4UWRMVtcl5E/XRHmelP8BdSzthKlrkhMofKBOzAoU66+XgW8aEQqnCy4ksXdjHlwoKaHsghvlXywf5eMRgpYbECXgIYWEoeEmU94kxkKr4w8SrEASQu71Lj1dnGc5wQdDQJ39xlMegZ7Bj9i8BCs+GFIjnokeyQ7IDmcPI7Jcc9kz2QHJo+wPYDJSc9kz2QHJhP2OCanv2eyZY8SZW2hI3F5c/yXxJ19t58avkOL0S1u48ktbq32J7jN/vIWuL+hkdCbNufR8yMsi/1zoH0OuqYfbm3xYHyxuR3tM9qGd2hrNQOKo9zBRfl7CIYOnt07PJX/crm1tmY7gc5zC3hD8HEZ96Am8/TLyYef/5H6BQ==')
   		];
		  
		this.addPalette('gmdlButtons', 'GMDL / Buttons', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLCardsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var anc = "shape=rect;fillColor=none;strokeColor=none;";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library card ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'card', 342, 356, 'Card',
				'5VZdb9owFP01eSzKd7tHPos0tlVlWvvqJTeJNceOHNPAfv2uiSHQJC0UtD0MhLCPr32vzzm5iuWN8/W9JEX2RcTALG9qeWMphKpH+XoMjFmuTWPLm1iua+PPcmc9q8521S6IBK5O2eDWG14IW0GN1ECpNswAZUYKPZQQ4ZGjhDI2FkzI7aqXbD+Il0qKX7Bb4YKDBjMSiwrnDk5MKpAK1r3lbiFT6z2IHJTcYEhFY5XVEZ5vasyAppnZ5gVhDZKyBtL93ub2ODAEdJPhnU1G56VfMTSa6C/iVUYVLAsS6QMqlPxUTtyPceJ8ugInfouTz4SnBB2K6A/CGOhSliQhkrbYwktplvT1aETYkNGU48pPoZTINVOCqyX9raORfKQTyaE8XUCir+CEDYRTu5mNzAGTmwBBCSWe8WTYcHqYzlTOzjFiD+kb81QNgsA29L6ngx/UmARGFH2Bo5SXaBO0tFmIiCiIEVSVFigTK1lqTcQKS3RtkWixNjHfqka5DsxAYzoApAbmWDkjPC538V+hMhH490QY4ArWZg8Ggz7FuwToF/fRcNUh+IFDHL9T6xqZ7/h2/qnUt+GZUpusD4Jy1aQM7OMdIklKUC1r7Gs9yS3hRa1+19C7Gt4VSL5K/75t3XA5Hz5O+0x66C3XzA/69mw2DDy/ceR3URhTvuFuE/G64+U0jnX2ETFAhLyA3BVhSvuId8M3ab3x/ZZx7+yOFuVfxbf7dFc17l1L1unzw+Lb/yns+ljEv6zzO9kvkR2nzWtvHX74VvwH'),
			this.addDataEntry(dt + 'card collection', 358, 642, 'Card Collection',
				'7Vlbb5swFP41PKayzSXkMWm6blq7Te207m1yggNoBkeG9LJfPxtMAjGkJDFbNY2qEj4cg/195+YTy75Mnq85Xke3LCDUsq8s+5Izlpd3yfMlodRCIA4se24hBMS/hd51PIXFU7DGnKR5nwmonPCI6YaUklKQ5S9UCQKcRUSqA8ueZRFeSzknS/H+2Sqm9JJRxgtVe1VcUi3n7CepnqQsFXNm6lOE5+S5c7mFSK31mrCE5PxFqDzFQR6VGrbrl9MiEoeRmuY5auE4KwXhdu5u9+JGAdAOhq2BAcVapjY4ChNM4zCVw3J1+xg5rjv1nC6MVizNa8rviksqr/EyTsM7tWNnJ/rK1kIA1dx7tUZQjeNfcghtMeYkE6MHhaScEeUJVbe9yEGnkYOcUsYJxXn8SBrvP4cw50TrTZ5D6XEXYRLQi5ytfyww15lCc3vie2dZs90OWHPCi3LUC7cc1+B0PB1NeCya6vtfWCyWtf34aIIanx+Nm29gq1VGco2N7S56EeRqBH3l+JHQgiNOcHKUZ7V7TJM0D4zn/qzV2mv+IFF5zddKx5LLkCTHS0ynyrOTOAjkeivNG7KS3IxRzftpIat72FMU5+RezJALeBL2N7DXuePz7OSl6bxG7cIz4bhrTlZEwLQkWU/j2OanXri77bgfcNcKq4a7ekbctXpN5a3+AKyMTbCSEcyXkUZIHf06K4qoUrnyVnQmRb3jK2yLr2YIG1Vlw5CM+SYYSzAP4/SujLEy1N4WAqHmH1viifcH7EkFPD0Cl5L3FdhD1x22dyaVijofDkDdRE+NIuEgAIXZgOlGwCtSCU7FYEHwMhIxzjSzO8GM5TlLhHjk94yks7n868hqXYl1P48u1Gf3k2Y9UdcqXWkx3glVq3+a9SDgdBtK3woVAo3mT5tkQbhieo9SsY38UMFRL+lryKgCZA8ssBvtCHZ1fibF9doB4eTypQP+XVR29bjc7s5DHSMg1Eh6kLuNiKhVpQfOpAdayKOSnIXgzgvlnVTKNmmA5X4+ZBSngYXE10DLA919FddtuHbTWh0AC0doUr1vG+cf94wx5wIjcdgeohSFegvk/v307qqLrzrMraeIqWtrx3NwmGjrlXNGFR+XghrC94765pmFGqs+0El1zJxD/WaV5KIhONY7O1ffv9x8/s/yH2P5j9Cs94M+4jTEnDEh/YYpJXL/93iFeWy8nHrrZdN+KYDak0RLjW6oTbjNG96kZ96A/rGJo3fK1ztT/QziiFYUKK5WkA3AqLtvK4SObyT1jpwhjq/QSB9ogZc/e/cb6ryc2HSAh7sO4KJqex5qPLR1igw1dsfNUDtEXxf2aBVVXImZ8Tojb4qhf5+gHp2hgyHtb7Iz/tfoEcPdT7qlev0X398='),
			this.addDataEntry(dt + 'card collection', 358, 642, 'Card Collection',
				'3Vpbc5s4FP41frSHO+Qxdpx0Z5pup+lOH3cIyIapQIyQY3t//UpIsgGBCwZyc6cTdJCQ+L7znaMLM3OVHB6wn0WPKARwZq5n5gojRPhVclgBCGeGFocz825mGBr9PzPuW+7qxV0t8zFISZcGBm/w4sMd4BZuyMkRCkPo5xFg1bWZucwjP2N2DAL6/OUmhnCFIMJFVXNT/Fg1gtFvIO+kKKVtlqIrgAk4tA63MImxPgCUAIKPtMo+DknEa5i2x5tFIN5GopljiYH7OTdsT23Pb08vBADNYJgKGDody62p9cLEh/E2ZUU+ujpGK0P37GUbRhuUklLl++LHKmd+EKfbH+KNrbPpJ8qoQRdtn8QYNVmO/2NF3aRlDHJa+iWQZC32UUzAE30Oq7OnTkhtEUmguN2JMOM6wgyL2zCAPolfQOX5Q0i0rvTo5LBlKlxskxAuCMr+ffbxIE82m4GpNjgKkS5sXi7BZjkqanpf1ET/31FMh3XqfH5jVLqfu9UnoM0mB0RB/fQWnYiwFSIe2fsnuzwOegmqWShVVa1v9LXT7OQlGTBA/iQxric2DMZvHPjwVgg6icOQjVfW/Ao2jBbXKIkeFrayiJo0NqWwbHeYixyr+hzVJZwxtJlhsAEUpgDkHZ3DudfWbNTdcLebcb+gVIlVRanOKEqVj5FC9SZgxR2DlRz4OIgUQij6xp3tOMsaK4IoXlmq1RhIUefQqjeF1nEIm8vZwpSMeWMwlvh4G6c/eIxlofaxMNBqXsWwRISghJrnliqtE7mNOqT9hmgvAqEambnliyRh6imH7hqjhEZPn4DSG4XSf1IYJzR3hOekqaUUzTrTFCnSkmfaUl09sz0LiutprJw6S1NOxpVzLp4dxGukue+M0vszvXK2X1kCaD3Z7Tqj1DWFm69xTkBKbQQxv0A7TP9s/BeEKQmsO4pvTnJ2lTL+fPi8S1hxH4EU0Pfnl1hcIkp1Ck61qUOx8qIP1dU5SZkeuWYo22bqCsG64C9vxqndl9Nmxdr2BIrVddUt/nr6uf5Gbd/+/tVGXuussr5cqzKqKeTV1addIFDqOqCEADwef8dKg3KGFfsOVTYHxt9DJfvJBCufOi65126MXJVi+ZqjyK9d867h2p7TKe8OSalyMWCrc6jmFGs7I8RbdR/maZcBnBQbZO88/fUVlt5hMnMp2w0CWt0ruUc5KVISiVg++g5QRoF+L3loLHBraaFrFhqEtbodMmpAMarBQ4LtqaFjecf+DdukbcFVtrix1ITgNC2SL4WLlvWVXvf8ceL9KFsT08V7z9XXzu1rxXtLVzP6hPFe3YD44sPgiNgE+84/5p8u5jtvGPPVvYM1hDEL9g9oB0P2rh823Lfg+hbhXl3Pf+Bw34Lrxw33hrqkf1fh/napO/arTe9tx+0W7k27nb+uyjDUZfPHVQb3o+HKuATs6wrj2nVvj7M6rfg1biuN4MwdZy6WsA3cWZpbU+zvN3yJcIVGnv3gd9OBzOkrjTZerjyVaSNGtNAW8kj40slMU9oY6dDbrfQ+yZl3l68PJFe0ZZzl4F0x9PkJ6rAMvxjS3pId97PRQ4vnT9149fKXcP8D'),
			this.addDataEntry(dt + 'card collection varied layouts', 358, 642, 'Card collection with varied layouts',
				'7Vvfb+I4EP5r8kgVx0mAx6U9dh+2UrV70j2eDDHEaoIjx9vS/evPTmzID8OGYGhKL1UlPBk7znwz48+DceB9uv3KUBY/0ggnDvzLgfeMUl5+Srf3OEkczyWRAx8cz3PFv+PND9wFxV03QwxveJcOXtnhBSW/cCkpBTl/S5QgQnmMpbrrwFkeo0zKGV6K8WcrkiT3NKGsUIWr4pJqnNFnrO9s6Eb0malHYcbx9uB0C5Ga61dMU8zZm1B5JRGPSw0YTMpuMSbrWHULfTVxlJeC9a7v/u3FB2UAszFgyxhAzOULdE+yCUrIeiOb5eyaNoIunE/nh2y0ohteUZ4Xl1TO0JJs1j/UG/t70d80EwKg+v5Uc3R1m/yWTQBFm+FctP5RlpQ9XmPC8U8xjtR5FU4oZDFPE3W7E2BeP8A8v5QxnCBOXnBt/HNA9Ht6dLpdyyi8W6dRcsdp9u8CsbM8GZoNU+/wpoL0LijbFbP5Ydtq4FSrqec/USKmtXv4aOrVHj8a10egq1WOecvqu7foBETQAuKB5EsqrHZSOJnDpBFT8wDMAgmMycsrcSAt8qcYKwNqJCNGIkyWKPmiQjolUSTnrFW/45UEZuxVwj4pZO8ZWsH4PCd5q0eoVacIbURnxvAKCzMtcd7RQXYLUye7B2a7H4lVbatarIZWYlUPo0N1cgFUxjZQyTFiy7gFSNX6VVQUUKWyDlfvTIg6J1dgSq52ABtpvnBJxCYtxJ4YHq3QQr6TGCjvAWCK2JpsfpRpV2bfx0Ig1MKaYEY5p6nOkY1Imz3Iv0NhKZ4b0ddKXjbl4Wq+9g1ZeKGer7Pwbj5BhRbpZN9Iy+3VoZR8037w3rQIQivJewIu4HRTG2nCipcd32i0Qe4E2eRo2getHGJefIEV/EbBJQAErg0EY5HoDRub45Ff3ZwYgn9aXI1NS+fVYHruamAA0tZqAILg8ssBADaAXVD6LMLz+bawNaz0qihyPrZuYx+lA8wuuH2LNHV6Fgujdka2eqcvvD2p3ZAB96fXwLtdh5qjF8oEKXG8MJGpdyH20OG6WEEpioQuZySzy/lgTaB2ulYJ335b0CB8Jv61p3UgPMYJG3yvSRH9SVcSaInw7RwVhkHY9tXx1OCsOr6HyAGBlfpaPxK4l+s66NW4IThQzTtIDo3IDpsctgt2PZAdHjksPfZTs0MrVbdBssPzwf349NBO9e6j0MNBI34dftgu/s1wztvcEBGWkI3lWqB5If6fGJ5KDLcND705oviO1cLWvuV6PPHUIuLH44nejRYRwaevIup53SJPHHJV6To8UYP5WXjikBG/Ck80nGe72grcnwt24mCdPOAA8dpBPu74lV54JuiXZFm9j7udcLrKLa7+nOg4Dh1B8CdWQBj5F1k4rZTOFmj5bMqgxuMzVVx6Zkjv+E7avfOaWxNDkjQdfLJ0SHFcz5GXOKPY5Tyaxkr0JFmOB4XQ7QPUobh1NKW9JzrjW4NHNPc/TSjVq79c+A8='),
			this.addDataEntry(dt + 'card collection', 358, 642, 'Card collection',
				'5Vptb+I4EP41fAQlTnj7WOh1b6XbvdNupdN+OhliiNUkjhJT4H79je0kzYuzDeDsAU1VwBOPX+aZseexPHCW4eFTgmP/C/NIMHB+GzjLhDGufoWHJQmCAbKoN3AeBwhZ8D9ATy1vbfnWinFCIt5FASmFVxzsiJIoQcqPQSbwcOoTUd0aOIvUx7GQJ2QN7S82NAiWLGCJrOps5COq8YS9kPxNxCLQWWRdkYSTQ+twpSgb6yfCQsKTI1TZU4/7qoYznik1n9Ctn6lN3GzgOFWCbaH7Nnv4kRlAbwynYQwbxvLgWCfZBAd0G4miGl3dRpY1nU8WbTbasIiXKj/JR1SO8ZpG22/ZjN030TOLQWBnut+zMVp5mf4rirYD5YSkUPo7s6TdFRF0HiLIVbKEBJjTV1Jp/xKU3DNdNjxsRZiNtqEXjDiL/1nh5CJXdfSGqSocsygcjVW5ZDZ30rSafarVsv7/YhSGVXQ+nKNK98NptQW22aSEN6xezKITEOMGEE8ErC4Gjz2SnBQ0+mCoR858MpsJdHS+XPJ2ZL0fSSpsREWBMl3j4CGL25B6nhhyXvMPshHgTFEptgMpW+x9ysl3qCZ63YN3gcznYfALwms8vcxRjtUoNeoYExMRGidkQ8BMa5J29g8XSefoZPex3u4/idfcVpV4nRiJ17yZPFxnPaAyNYEKgAKh5zcQKZu/DRalkccsuhCozsusrVtmzcA2nIz7x21mAjcYBoe17JeGUmeExv0BlMdsnwDNTQAU4mRLo29qNxSb4hcpgGqzimDBOGchiIdu5/wb3hD5qM49ts82KLWL/p7b3dZurH3uYmiKjGxjM7sHXG3rfWB/zocWj+LvoiRz3iW2Smaeala7qaFgmld3qYxaGja63TD6c4JfgRnXTQ9W45r0bZUFSC19Q66GEdVyxLl8tEFgItNrgbKcYYytJnquZSZE+gCreXzwlexB8IMlL/C1pPzYFbeWtLuOm5hfHTdLPneKW/1gwwxwzaOOR3xU1C2OCUzeG0Hp2SfwyUkYk5RLFKlsJsFbSfT2FCyArF3k0ZBGVO5xyNrsxDDAttZqJ7S4bGVPI7HxiC74LolkTc6K1ynbcX9IcMpFx5+F3h6mDPMWLeJXtkvwKhA11z6OtuIHjrxC/RlHL4J0SvkW02jU5nfSI9KqR+i8JHND4SiT2tLhatyXs5JSsUlbdcI5tPV+at4nndxxyj45mxnxSdvqZTVpnuw8LJ8///kVZPaFy4juPKy2irjL8ePioUTy12BtklRcoWgmG0fPS8yxolACd67JpVwz2A7HvSw4zcOiAttmVnUatrM7w1a3l1yI7aHqNv1CbeT4pysfypbVWyBDBQN2UZMD6+lRbrqrpEcdDpR6p0fK2T4SP2oeB0GQQNrGKYu6LqTXy5Ha8LxlktQ8H3raRaKXt+R4QfDav3AbvAKm9D+j1wtVQs1TIKBFkmjs1VcKzYkvQEcQFrbJWAtAFuYwR4xFZcqSCo0VWWOpGjLZkEeBYEVrrqZQMKPdvZOZDm5ze2wGNQ+yPgqbacPzfuhMnup8QDpzOrg3zmc014IaCF/KZ26JveTZ8nvkxVRK1gd3OfsS0UnXVVpzLQM4NONMD4KhVdTtZYtsHgqdEVkrvH7RxUkRQW24nHkfQflOK+W0Rqh6KUB7J0F3lcTQ1a9pdU3s4+ZXlxs+OVagSeOUXBVC9w/Q6Wcz14PO9N7ggeLbjW5VvXzh+z8='),
			this.addDataEntry(dt + 'card collection', 358, 642, 'Card collection',
				'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'),
		
			this.addEntry(dt + 'card', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 344, 254), 'shape=rect;fillColor=#BDBDBD;strokeColor=#BDBDBD;shadow=1;');
				bg1.vertex = true;
				var part1 = new mxCell('Greyhound divisively hello couldly wonderfully marginally far upon excluding.', 
						new mxGeometry(0, 172, 344, 82), 'shape=rect;strokeColor=none;whiteSpace=wrap;html=1;align=left;spacingLeft=16;fontColor=#666666;fontSize=14;');
				part1.vertex = true;
				bg1.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg1], 300, 230, 'Card');
			}),
			
			this.addDataEntry(dt + 'card', 342, 378, 'Card',
				'5Zhtb5swEIB/DR9Tgc1bPzYkrSbtTWulffaCAWsGI2OSsF8/Y5wmBFBSAp22ESXgs882z5195xgwSPdPHOXJJxZiasC1AQPOmGie0n2AKTWASUIDrgwATPk1wONAraVqzRxxnIlrFECjsEW0xI2kERSiolpQJCivHzneyC6XEaE0YJRxVQuXq/oj5YXg7Cc+qcHqqmsSFLKdFFqykIiU6kc9NOYC7wenr0R67k+YpVjwSjbZkVAkTQto6zknmMSJVoOe3whR0QjiV90jDfmggfTDgW+GMwzhDFukLinnuCC/8Hf9OmMIgXGEvMYxTI4pEmSLW/3fQs2+nppUJHmBO+AylvUwu1fXCELwIiHb7AKy3wpIj/CVETkwMA/zcRqNql08dMCiqMCiw/d1mlchdzrIX4iQsM+5S0i1l+4SIvBzjja1eCf3nlmYAuh0oYJpoLrvANXtQH0ufyQYhUNYI5aJPnf953DDOXB7HdxPHFcJKzMJ3AzJlhTyBWil3pBSJu8bVtJQSXYsCzGPSqpKKeIxyVBTiBCXv2XOMnnD+w0tQ5LFd9Pv5AOWRpTEmSxSHKl+Za0c/6MqrSy36zeuuqS8dgmyQfRB9yBYfuzgpS6sLFPrP8sgUpfhscU37QZqjImCinYA4Gi/uhRkLDBBGPbfIQyPMp7dNd5rOjRbXK9aCpcMYPu3bQB6tIV9ZsdJlvz9jYbtTxMegRcEYARw/43AD5lOa8O150gaFnAO/JZ5mX+IigTX7c0mkVfGSPdxfWC5i9OQ3smIyK81zdKBa98ZYZr7ftPsW3l61co/Twxl+T07k3v7xmRZ8ziwu1yu1n+3A7ttm8zkwFecXi87MMe5TBSuPYI4a3/UMXbgHPunPbh7xH0IXj58+TypH58nOA/g0QGHxEUPYfUkMieQ+4LzLWuirTC4QryecyF0J1khC8sB7TVyiN/TrpHucXxCC0NvFcCuhf3Acpzgv7ew50xvYFk8/jvYND/98/A3'),
			this.addDataEntry(dt + 'card', 344, 420, 'Card',
				'7Znvj5sgGMf/Gl9uQdRqX27e7rZkv5JestfsfKxkVAxy17q/flSx2qE5u2svlYymiTzwIHw/6CPgePFmdydIkX3hCTDH++B4seBcNlebXQyMORjRxPFuHIyR+jv4dqTUrUtRQQTkcooDbhyeCHuExtIYSlkxbSgzUuwvBTyoJt+nlLGYMy7qUi+tk7KXUvBf0CuBOu1LMpLwrTK6KqPvB0LCbrTPtUl3+A74BqSoVJUtTWTW1PB8v3HLgK4z7ebrwSJSNob1wbeTQF1oFYYV8aYrohxpUYIx+JznYCq1rNNUCfCzEvhoQAFtE8CIpE9w1PyQKvoO3zlVN8ao7U/QeFTH2bYBnqYlSEPUQzcn6ewbOt9TqRT+W2wl0n7aZXLD9BTaZlTCqiAP+xpb9eicT1PsBaao+DyiLl5B1MAQdfX4MwOSjMma8lwOzdEhjXsI5ie3dwm5Fye/Pae8KBZ1UnYBJf0NP7Re7sHysVXrpSi0A3qLXFePpUcnck04re1f4WgaIboAjdAWGjiIwtnTiGyhEaAgmj2NpS00wqAdy4xpuMgWHF3gqA5vL9R+282ZkGsLoS6YWEbo9KXrlRLqAoxlhE5YSl83oS7oWEbIXITPlNBAHPKRP//vNtdc0c+U0EAcsoOQNZsAA3HIDkLWbAwMxCE7CJmbBe/i+0/fvp7GqX/oMHZMMbK3SRhd5yrLIK3bVaU0X3+uczcqTBo7pWH90/aV7qDb5hX91s+cHWfaR62OHJ49G4nOgv/NcnEJ/ub2xH/+18m/becl/FW2O+FsqvcPQP8A'),
			this.addDataEntry(dt + 'card', 344, 162, 'Card',
				'7ZfZrtowEIafJpeVEhsCXEJYVKmbBFKvXTIQq06MHLOkT99xNgJOdIJ6clG1Rgh7PBOPvx8vcWgQ3zaKnaLPMgTh0JVDAyWlLmrxLQAhHOLy0KFLhxAXvw5Zd/R6ea97YgoS3SeAFAEXJs5QWApDqjNRGtKInUxVwR4fuThwIQIppMp76SEvaE+1kj+h0QN5MT0RC+UVjR42yvFAabh15pybyoQ3IGPQKkOXKw91VHjQ0agIi4AfoyrML7NnaWE41rF3BFgpKbQToS8T6Z55FysFKf8F38vp9MZC2rFkDwFvQRpNC5sCwTS/wENwG7hywG+SYx71aB+q51Qh8nBIQVuk6zx7wR9Z8Od7zWVixlHA8Ie++P9c08kyoJZKiUxygWSiG86rwJvNfLTLE9tzbaZK3dJti4oZsep2mYFR7xpxDVuMMYYrLma0RToW7yBuGVDL1pAXMx1mCYwtFXZc42SfyeN09CMd4tpQ/bwYBQzU5LiTp4qjQcL3TMwFPyZojHkYCri7foKDrnztNTMg9QblmvzDInJfXER90fsW+u35RwQs7AHfI33h/9Xsyavs2zewSsJ33b8mlnwbBVkkzwkK6Ib8wlPMWGT5lISQfVSltqo0MJ//qtqq+uMBVJ3ap1Kw+/j1y2sXg+rI6TifniSeBt54HLScNc8LfkDNOi8WE9cWkPp/JuDt4eypbxlkAD1nQ+rpLxbLVctGPCfrMfn39JwOICg2729IhXvzBeo3'),
			this.addDataEntry(dt + 'card ui controls user interface', 344, 162, 'Card with UI controls',
				'7Zhdb5swFIZ/DZerABPSXK507U0jTeukXXvhgK2ZGBm3Sfbrd4yBEAEtKB/SJECR4LUPtt/n4JPEIVG2f1Y0Z2sZg3DIN4dESkptr7J9BEI4vstjhzw6vu/ix/GfBlq9stXNqYKtHhPg24B3Kt7AKlYo9EFUQsFobi4VbPCRDwkXIpJCqrKVJOWBeqGV/AOtFigP08JoLHcoenhTjQdKw35wzqVUTfgZZAZaHbDLjsea2R4kCGwYA56yOiysZk8LK6RN7NECvKhc6HeETHZkeOVDXiko+F/4VS1ntC1+vy2Hk4DPTAruraZAUM3f4SS4z7hqwO+S4zya0b7Uz6lDZJIUoDtON/McZX5wbjo+PJrzQyjnWF0FNCa2zF6FV0rIRceTH1QDKprxwjxb/H7LOjbh4kp75Fa/Yq6hiJlt71umhOVh7Mrphm/TnzI3CemiYgziGyq+Cp5uUcx4HAs4dn2BxKzSC3vzece4hlfsaUbe4faGGtOZuEC6tzxvOJwkuDsxwceCCDsg1nSDwhpTENQIAp4/lsB/DcCfCqB/h6k3r4tuMMsOwxczQ999UhJfItc6NgJlz8tEInPOKLsow8UVUN5/XitiWjCIKwh14cj2qfm6dZdmsbgrNFV91aJ5LYdK+FUKtteDwDuzXtezqyLq8k3IFZCsZiQTkASLGyDx3JnJBCbL1S2YeDOTSVsXuQWUET+FZyhHKMHy8lDw9vjXh+3e/mfkHw=='),
			this.addDataEntry(dt + 'card with segmented buttons', 342, 522, 'Card with segmented buttons',
				'7Zpdb5swFIZ/TaTtIhU2hCSXzUerSa1UtdN27YATrBpcGfcj+/U7BpMmtWmSFVdVV9JUcGxj8z4+B3NIL5zmT+eS3GWXIqW8F8574VQKoeq9/GlKOe/hgKW9cNbDOIBvD5+1lKKqNLgjkhbqkAa4bvBA+D2tLbWhVGtuDGVG7vSupAmccrJknE8FF7IqDScz/QF7qaS4pVsltNp0SUZS8QhGBAemPyoVfWodc2UyAz6nIqdKrqHKI0tVVtcIIzPQjLJVZpoNmtGTsjasNm2fJYAdo4JbkfCtiiyr7VVFlqJQW/a42oz9hv3R50ZBc2z61eJJWkLpbyPDwXJit5zrnQb7xA3xqDZKyoliD3SntUtx0+OVYDCQTXf9zYmaNmK5LKmyGG1GehC2yMI2ISXjLBEWPpBK2RCCatuFgOMXEHS5FpslhJ9ytirAthBKiVzzviMJK1YTczzDz7YLulQNVBviY8YUvYGauotHiAVgy1TOj2Ec7nUZHAcOlwmOhHqoGw0sHtDXUlkwUlJmNDXSNo6VP610RDxZ5Sk/4SKBoYnC8qhCFNR2v+lIf2y+42oDOycLyq9EyeqTzmStxobrxYvynKWpHu2EGOC8gmnNg009B/OOaO422GKLHGjR4G3+ajrrD00wWDcYPXhvvD/o7p8opSLywElydjqdRGF3voVCh/5hJ/o3aI38MfIg//BL/jb5G218yj/6kr9N/ijyL//4S/42+Ru9fcrfBLgv/W39h6N30B9Z+kcnEPWCbwP03SLhXjxvFleti6Lu17MDx5oHH7ucbbvn7t50Bz6eWJDr2Ttq/oI+fH8oWHOSAvauKUzwe0kKewW953Gmlcj2w+bgYz2qOB9A38rWsBwHPljaWYOppPUwtzGmDOJYCTvQK5UQ0fRlw1UDUKBD1L2klVgAu6evNya5Vrj+rwetr18s7ktVtSx0bc6qI1aY8kT8gcuf6ppQjyX65FQpQNuZM29PndCeOnHLRDHVrg3Tqp49xXxMJ0eoiLuZTgh5icl2OsOC19wGOatucu3Zpn/MGrXoelzWCHWjch8NIh8y21mKn6KoRt+4HggZal/QTkseCONkwThTay9hOPoAYfg4vlFXfCMvfDvJKyRcJLcuD9sEytczwA047IsM9rgSincWQv2xF0x2/gEWJKdhcHX5TrcsV7K9SfclwIXK93ZD0yA4QWg3A+FK/jn4d+aYgRfidspj2Eb85duWtwRYN/lDHhpn1eegdzJdzAq8Z1ZEwTj6hNPCTsWAU58G/0Ug2Id8GKDR50OO7ezP9fxmfv1rfiBxPB+OzrBn4h75tsN0vdSJOnoJG3WQ0YDD5x8q1NW3f8fwFw=='),
			this.addDataEntry(dt + 'card slider', 342, 570, 'Card with slider',
				'7Vpbk6I4FP41PHZXLoD62K3jvLS11nRvzeMWA1FSG4gLOOr8+kkg2EriNAppq1zp6lJOLoTvOzm36OBxsv2aBat4xiPCHPzFweOM86L6lmzHhDEHARo5eOIgBMS/g6YnWmHZClZBRtKizQBUDfgZsDWpJJUgL3ZMCfI4WMmvGQnFlM8LytiYM56VrXhRXkKeFxn/lxy0kPKSLXEQ8Y0QQnGjnkeygmxPrrkUqQV/JTwhRbYTXTY0KuKqB3bVQmNCl7Ea5g2qlwVBXgmW+7HvEIgvCgUzIlhD5DVIhWCaBWlI85BrAIk3KYHhaXHw+qC8lPyV/pKdkVffq9GyXWJBw4A9MbpMhewHLwqeSNxWQUjT5bO6n6B32QtZyHeGcnxGcjH7d4WNxHgT04K8ip7yERuhW0IWFwk7hwJ0GQU1AxlhQUF/kqP5u9DiarTMuKBFjANQLPQJiweD+aySzHheMLncfJ2muw6EQbcFYQmNIkbaExaocayUXY8/AHT+3HP5U4+YcyqejMDuWA3qEXyxyEmh8b1fWCsV8DQV8P2W3A48+XfM7Qi04Lbgq4uJVT3e5BSTB4j7Y1GhDKGC+YBVaGJ1L+yyA33dVYyR8wymHThw2xjEjvurQYPXOw3gEY6wRsTAwMPZ1rGxu7Yn6Oxlew0+DgWiII9JpGiq44Jku5Thy+MyidhjUlrefyq72w3d4wF7rMXbexrYQ3tgP0CALKA91NCGIFnFF0C+oWm0j79qN4JMEdnRDvxgZ57n+RpbjgU/CJvznBaUS3FWsdLYrBhY2IpG9UAmm+j1oh711E2T3KuyjDRlEfbGu3x7hoyvo51Rae6qIeYeWlENz4Zq1Pp2YQaX8pRopkIJ9cC0Fxo85Ove0phM+B0teL9Awz78Yy62CGlnrcPyap0ygz97Ub+hizoD0LATUA9xI2xRY/gYuDhIK3vSqD/45XVKhfuADjxi32sGIQb8DPDhfrKph5qufhVar3QIuweeZho75nh+j/yha2iTU2muIRRUkOwCi/8Bc43YEeukebZ0Xi9XSPtxS+AO0dXA1QsB8nZ+O9hC17sauHqa790WuAj4VwNXz7GHNwauP7oauHpK/bYmeRS0LQAb0cUdcp1Gbcr/7GLv7mjAYdJjynpQX8HKyEqeo+fAIi8tC5AO8llNp+gR7hn1/1vLczSBIR6V16HIX1afUw8dTyNE1Ux1jxPZlFgfXeWGkHQ6nQy9yamQ1LbSnUqw6/EvjfZmddVCBm6s5Bm00oJS7ot48NijWtJSpGfj30mU3q3Q51shF9vgVy8CDHA/VgjcrdD/0ArZ0VK94vIWr7O7EfpsIzTybbCr12189yqR0NnHgXcT1Y+JQp9oouzosF4fO+nhGDUcURz+vszKOYWOuvGIAvZkKTwrfkAvlE3/fnkRkm9f5n99e2vpDJTF+PMZILwFZ2Ck2O14GlhTXM/ThWJx+/7b0Kr74U9HfwM='),
			this.addDataEntry(dt + 'card', 342, 236, 'Card',
				'7VZNc5swEP01OnYGJELSY4zdXJK2kxxyls0CagRyhWJMf31XH7FNiKdubB8yE80A0ttdafXeCiAsq9c3mi+rO5WDJGxGWKaVMr5XrzOQktBI5IRNCaURXoR+22ONnTVacg2NOSSA+oAVl8/gEQ+0ppcBaCu+tF0NC5xyUggpMyWVdlZWuIZ4a7R6gh0LuGYtFc9Vh2CMg7AeaAPrvTk7KCR8A6oGo3t06URuKu/BkpBoBaKsQhhlqQd564FyE7ulADuBhbcZYSNGHpXOEVEF3kwFeJ/yfkQT7sfRoxqzQ8JX1wL+IP5Y55i9jEN0hGPLiFhweS1F2SA2V8ao2rK35AvRlJMwntItdguF3XmcIqShxdkfA0OW6a4SBh7Q0y7RYYUhVpla/o8Q9H1CJL7oIg2SG7GCwfzHiJOMxJkDySiZXDaw8h3lH9Lu4TCNEteGGtltf2o00Cgs8VMJy2zUh2mSYYQqihbMSNNNYgfJfDGSmee/8PVj0/w8d/s1ZafR9Co6g6bpSNPOO9TAGyTVrtfY9+yTaHKJ2aXS6jrX2CuNIy79/Wy/ixOOXnPAE6/8KY/aWqCgG/sR5/6gGqlFnkv4oDVyonMfs3MUyeWoSG5n1/ffEbr7cT87Rtfkla7xR9O1HwT8U+Wrk6j85WWeY1TG4faH1rvv/u/+BQ=='),
			this.addDataEntry(dt + 'card', 342, 530, 'Card',
				'7VdLb+IwEP4tPeRYlAew7bHQbbfSvqQirfbokkli4cSRYwj01++M7fBKKOwWetpUFHvsefj7JuPBi8b58lGxMvsmYxBe9NmLxkpKbUf5cgxCeKHPYy+698LQx48XPhxYDcyqXzIFhT5FIbQKCybmYCVWUOmVcIIqYyUNFUzR5CjhQoylkMqsRqN7+kN5pZWcwdYKmIdWMhbLGoUBTpw/UBqWB2M2IhfwI8gctFrhlprHOrM7or4LNAOeZk5tENnD+qyygnStu4EABw6FbkSiFiITrhGL0E8lVMajghZIMasyIAu+PfAbiCXmaSFWyILASmShn/krqWMobu78kG1Cjk+ZuBM8LVCmZUmmSjblRTqSWsu8icLKvkJC8ATDjWhCOlaioEJnvxywRBBzhoXRG9UZ1/CMehRAjXmKskzn4m/oDLvpXO0oHCM3im6sUIFgmi9gR7uLcefxp+QYyNrd9dpQoyOTpALdypF1pCelTb+VNs/zF+0ypzNlEDHtCN7Kjlvz7CZCcEoi5DyOBZyeC23mz0F19G9vrqtS7+V26F+A2UGL2bvx5OnHd5QFx4pl9yt+oB7sZULfPHvMBx2Z8TG83QzatPXPQ1vgX4K34WHejl5y/3l7k7flrumL0vjpeIfSefnmy5S6ql6ax6I3L9ekNhUv7OpZ1tX3PeDvKmxR0VS5bSqC81Bx3VDacBEMLsDFTYuLJy8csrw0iEURIZeTU/zoDC+cHg5Gc3SLpn3BZ3QZ5rKiwEspOF5gnBWVXc5osVQy5xWSSfvo0kQ7rGhWp3IuaAkbZYRKkfXfck4gy6IVCDnJ2MLY4Dl9JUgzJo4AKDE267WSIuag7KSQ2jCGhOEhzNG1cfxiI2Izo+evyOmeO7P7hTbH0p18kgGFXkP35lRunOEpyXXMNGGHlQau8PsLrGxgxqHP4tiBSwUJRwXNdU12XkFJ6k613FgzxyXvfs3E7KpBay8WZXtbezKjHtO/jJM5weZFTOnxgJM22QurqxvNhBdNiDVbNVKopvhO9g51QF11cLtW9jcNTGcje93vbGc+qHUJbofnuQQb4+95Y3G6+e1ot2//tPwD'),
			this.addDataEntry(dt + 'card', 342, 386, 'Card',
				'7Vddb5swFP01PG4CnCbtY0vXqNK+pFTaswcXbM1gZEwS9ut3MSYJBRSS0r1sjgL4+F5/nHNkg0OCdL9WNGdfZATCIZ8cEigpdfOU7gMQwvFdHjnk0fF9F/+O/zTS6plWN6cKMj0lwW8StlSU0CANUOhKWKBgNK8fFYTY5UPMhQikkMq0kofH+od4oZX8BSctYErdwmgkdwh6WLHjgdKwH52zgeyE1yBT0KrCkB2PNGsiyMJOlAFPmE0jt8sGpEUDJIfcIwX4YFkYZoScZySiBYM63G1Wd0pPl4ZMZtDnLDYFcQUF/w0/7LIm0+NfR8/KYgoE1XwLnf7fQtliuokwkecFTCTqYK6ZaFm4fVZabDIrdoTvkuPAvtvOx1qv6lbbDmQcF6B7pB6mOYnnmx7PL1wjw6/JRpKMFXMa8iz5DHG9VM8dNNyOcQ0bjKxzd7gPIcZ0Kub14yDz/jzM3/wF5pc95jflTwY0uoD7WGb6xNt3pvwbmpD30GTV02StoGKyzFAVN+JbXuACRGVWKITEeyhFZICdzCJQcSlMLaUq4RltKjFVeC1zmeEN9qEoIxTy40WHwJCAVPAkw6owlnhlkAF/LEw5RtbiL23YBg1T18mgfcZOm8Edt7YRD6m4t9PTcka3VZ2Ec+eT154b15rPDvfh0NGsfrvt+e0+eHn+9hUxb/S8u+atYMwIRnk7xFzbxOpC4VYDewZ5o2z7Dr+tiO3uNKuGd+Mann3x/a/hBA2X84uI1eP3UBN++rn0Bw=='),
			this.addDataEntry(dt + 'card', 342, 356, 'Card',
				'7Zddb4IwFIZ/DZdLkKrMy4mbWbKvRJNdd+Ngm1VKSv3ar9+BFhXRiBOXLFuNSXnb05bnPS3gkGC6HCqasEcZgnDIrUMCJaU2tekyACEcz+WhQwaO57n4d7y7A62tvNVNqIJY1wnwTMCcihkYxQipXgkrpIwmWVXBOw7Zj7gQgRRS5a2kP8h+qKdayQ/YaoG8ZC2MhnKBYgsv7HygNCwPrjmX7IKHIKeg1Qq7LHiomelB2nahDPiE2TDS6RqRpkaYrGM3CLBiKewnQo4TCWnKIOvumrvbxlPGEMsYqsyivKCuIOWf8GpvqzYe73t4fKspEFTzOZTGPwdZu34SYSBPUqgJap1cDWFpu1UqhVabip3hRXKc2HOL9djUW5UviwFkFKWgK1DXy6zFuVPhPOYaCe/CRkh5Kib0nceTB4iyW225exNuwbiGEfbMYhd4DqHG9FQ0m497yXvNkO/8APluhfxo9saAhiewj2Sst3K7l5e/4Qm5hCf+rz2oV6WAY8d279Rje8cSO9tVMU6jJlxXTLgJxvfPT6i1Dj4EijcJ3BAjxJoRJac6srOb2nkpBrVTNrWX/BNt9PdsLHKmi8sS78JT/xIbq3fY0+Nvh/+enutpcSyf4ylebr4hTPftT4wv'),
			this.addDataEntry(dt + 'card', 342, 386, 'Card',
				'7VZdb5swFP01PLYCTGn32NCtmrQvKZH27IULWDMYGadJ9ut3/QH5wDRZs+xpRpHMse/1zTnHxgHJ6s2zpG31WeTAA/I+IJkUQtlevcmA8yAOWR6QpyCOQ/wF8YeJ0ciMhi2V0KhzAmIb8EL5CixigU5tuQO6ira6K2GJKWcF4zwTXEgzSmZP+kG8U1L8hL0RME2PVDQXawQjfHHrgVSwmazZQK7gZxA1KLnFKWuWq8rOIIkrtAJWVi6MkMSCtLNAOcTuKMCOY8HPCBkxsmAKuYjDUkBnVpQwIimnXQU6Q2j/8CuMFaaNGGtEo8kqRKPm7JcOx1Lcu1tH59bMsSXlj5yVDWJKtDpVS5esKWdCKVH3VVjsExSanijdQQsdYxEJHS723RGrBaIuMTdxngnriimYYyZd0hqdi1ilav4nAsd+gbcHAafkjnpQAqeKvcBBtM8DbsVvgmEhw3I3Q6I+RhRFB2rkmqHSs4yUjIw0X/1QzkteEyFjykm+55d3ph1aIzrHGjXLcw7nu+M6UpO37WV3bl2q7d3DFZS9Gyn7mC0+fv2CWHTq+PRv+okT4sgJiWlHykceZ1xRt8kteh96DuQLN6irzmnYb9ckvIKm6bSmJz+J/zV9g6bpPxD1/vTtxvvhrjelvpHdlnXOb1ftIHF/NhLffSc17UIpDgMmhYnSsTAPf0WXG3K02/rT7hJh8HV3pbXT92+8vwE='),
			this.addDataEntry(dt + 'card', 342, 334, 'Card',
				'7VbJbtswEP2WHHRMocVxmmPsNAvQDYiBokfaHJmEKVGgaCvK13eGpOJFMmq0Tk8VYEuc7Q3ncUaKsmnx8mBYJb5oDirKPkXZ1Ght/VPxMgWlojSWPMruojSN8Rel90e0idPGFTNQ2lMcUu+wYWoNXjKTVgGKlhpqvAkw4G1q26pgUwtW0aOBBaJMcqnUVCttnDbL3YXy2hq9gh0NuIs0gnHdoDAhd13aHaPYXUH+LF8JKM26dUiC9BswVi6YulVyWaLM6opCV2why+VEW6uLYBlknyGnoiTjrWhGPncpGbEQRjmrSSOkhWe0IrgGCUKZsIUKSYe6YQrwcrT2ThQK/wC6AGtaNGkkt8Jb4G69mwC5FMEtHY+9kNVesHzz3VKJD4HNYWazHrPP67kN5A6yijuxfTpu3LVPR5KeQEchOVdwOiMGaoz+I9QmORMF6R9SEGQGFLNyA3vxh2gJEN+1ROQ0br3F1c2+h87zGmyPxrfETmJ21GP2KUrHrKhcTbKMyCoIFH9WYJU/4MNkjbAYOlZyRSeg0DXlWWklkTXJytqrBSkrowtZA3d2dFIwDis77UKvFalwXGFlDEX/qddUVF32EiEQwTYuhizoluPJwnOnACrMzaPWWnEJxi9KbR1DSBBuwm3dOuC5z4itnF/cEugBnLOekzHXYeczAZR6A8PGS70Fw10SNGeWaodjDS7w/gitT8wBxozzUFxdEhAraW0bivMKRtPUtHobzW2X0OOGqdVFV62DXIyfuX5nzp3Tn5AUTrF1yel43OOiT/bG+9rOM5dll2LD2k4K9YKm9pGuH+q13Y7Ptk07OEIvR4Mt7CWPXWcl/66Dk9HHs7TwdfwOLXzVa+Hb6ezp21eUJb972+6/VUs6hMdfwQfDfOSug+H9zqO23XPYoe16gLXRX87dkF2gPkBfdkfhrByOj3OY/ufwDByOz08iLrff1t5899P7Fw=='),
			this.addDataEntry(dt + 'card', 342, 246, 'Card',
				'zZZdb4MgFIZ/jZdtFKhdb2u3Xi1Zsotds3oUUiwGWdX9+qHQD1vNmtQmxZjAezh8vI8YPBxl1VrRnL3LGISHXz0cKSm1rWVVBEJ4yOexh1ceQr55PfQ2EA3aqJ9TBTt9SwKyCXsqfsAqVih0LZxQMJo3VQUbM+Qy4UJEUkjVRvFy1TxGL7SSWziLQFuaCKOxLI0YmAbTmXDVknENnzndNKOXxgKjueWA0lANbqmV3H7WIDPQqjZdSh5rZntg4vbBgKfMpSESWpEWVkiPuSeHTMWZ1G8YvtewpC1Xhu3krvFKQcF/4cvtZCzDUL9hdSfhP/tmxGoKBNV8D53kPkvdhB+Sm3UcZ5scxjmkyCQpQF8xOK7zJizkfywxLRg03X37TbaMsiptzt40zWIxZUCVHiJzgTFsy60AcD+AbsIgDneGOzSCl/touKknAZl3Zp/g8AF4ZmPg+ZZym1G1fUJCAen53fjjEFqgC0DzBwAKxwCkIBf1E9J55Pkhi/GPj2mebgC2+/kF4Q8='),
			this.addDataEntry(dt + 'card', 342, 342, 'Card',
				'7ZZdb5swFIZ/DZeVwE7S7rKQtZrUrZMSaddeOAFrBiNzmo/9+h2DIclwFLI2dyOKZL/nw9Z5jg0BT4rdsxFV/lWnoAL+OeCJ0RrbUbFLQKmAhTIN+DxgLKR/wJ7OWKPGGlbCQIljAlgbsBHqDVqlFWrcKyfUuajs0MCKUsZrqVSilTaNlcdz+yO9RqN/QWcpdQnWWZd45Bw2j9MX8rdNG7Fu7pa09g0YlCuhHpXMStIKmabWGNeVWMkyizWiLpyz015gjZ2Si1RvbXKabHOJsCAfm3xLlSYtx0I5sysALQi7s0VsJFfBZ9AFoNmTy1ammLcefOIql4PMcvxLFHUrZH3sgQkNHBY/Ij5AtJRIxWBhpqFuVjRwJbUehJeatgXFPQlsOoT41DynEGmTlyGirkYRjGYHaWlj5tE9KcKlUY1XbKCmtX84Ah8FmvlB708CLmGP+EMrGlAC5QZOon294Fb8riVtpF/urk/Uxej1ugYcdE+/01ENNRk01OLtJ7qe8jYTVQzHNUI0phGuOM1NL9wGNf+3M+0u1PeynU5uQHY6IPuYLL+8fiMtunRD+O/vo2vDf6WfNoHLHnma4obIzp7Oh9BzJ7P38XO7cwezO6mT8AY4Z+dxXnxN/8d5Fc5Ps4/nSdPDh1zrfvyd9wc='),
			this.addDataEntry(dt + 'card', 342, 216, 'Card',
				'7ZjdjpswEIWfhsusMKYke9kk3b1ppUpbqdfeMGArBiPj5qdPXxuGZGmgi7TJyq0KioQPcxgzn+yMCOiqODxqVvEvKgUZ0E8BXWmlTHtVHFYgZRCFIg3oOoii0P6C6GHkLmnuhhXTUJophqg17Jj8Aa3yTRgJrVqbo0Q1ZTUH5wkDuqw5q5yuYWOTLDMh5UpJpZtQuly704UZrbbQ3SlVCS5YleZF8ENzoP4kfrrH2tw4xvwu5w60ERsmP0qRl1Z7VsaowmWp2EaU+RLH63hxFj9DZtDP0CcbqQuwAnHZcs1SAb2ZJaE727dN1d5F2sGeCwNP1uzmtbfYrMZNIfE2VtPOFQ6jRBoJcTyCKsDoow3Zi9RwjEgWrY2DyDnarNqKrG6F/OQ9A7YXyHiYN73gfYH6z3Sz5hijq6G2DL/jm0yuSDRckWPP8Fp9YtQ0SGbEDnrmoZphwq9K2Hmcss2653QWlWU1mIsin+Y5qe7x63UfXGLFIXd7w11epPKOA9NmdGH1OSXNMRUAHQbQN4ziwD2mR4O8kQamnpE46WWfUXoDPB+ugedZqW3B9NZDQiQe2E/C6xC6J78Bim8AKLkGIA2VPHpI55brJ47eYfnM/3cRvnQRnWEeT/vXvEpXsfCyq5j/813Fvd9dxcLbXfF9ugoSet9WvA3RX99WEOJ3X+HvCrpFX2GH5y8fbfjLDyO/AA=='),
			this.addDataEntry(dt + 'card', 342, 146, 'Card',
				'7ZbbbuIwEIafJpeVHDsguCzpbrXSniR4AZdMsLVOHDlTDvv06xMlIVCoCnc7EhL5Z8Zj/k+DkrC82j4b3ogfugCVsC8Jy43WGL5V2xyUSiiRRcKeEkqJ/ST065ls6rOk4QZqvKaBhoY1V68QlIVEBVYSYCAkW9ypmCx4K8C1koTNWsEbpxtY2lmzUiqVa6WNL2WlD1eGRv+BTgZ8hAMKvbFi6tp1jZ0i4iPqc/nXDaLZ/jneyOXXYFAuuXpUclVbDXXjjm74UtarmUbU1f6+QfsOpbMmHR+khet5SkdW4fEY5atmGyER5rbKjdtYTFYTWKl46eievQJszxLwUrT/GXQFaHa2ZCMLFKGCZZGDALkS+7ZsHETeBmH11nsAar9Epqf5sgHf+esLvofY/hIc4pj66ONI2RU4KlkUCq4ncgvD6UXD6d7bruFxVYgBxVGuoXf+KQhxxG8t7WRKdqFiNO136LJsAQfQ3i52FcdswHEA7v11fPExWMda1/BJW/sNHZMnZOjx5JMex2EP08gvep6O7+D5aOD5Y7749uun1dKL7h+tyUnXz/1jHu1e5uNo19L77sruI1AZvQnUSQ/pQ0buwHR8nunljfrP9MNMj/b0JlDt4+EFKZR335/+AQ=='),
			this.addDataEntry(dt + 'card', 300, 176, 'Card',
				'7ZbbbqMwEIafhstKPhC2uWzobrXSnqTkBdwwxFYNRsbNYZ9+fUoTAjTZ3eSuliLBPzMe839MRELzavukWcO/qwJkQj8nNNdKmXBVbXOQMiFIFAl9TAhB9peQLyNR7KOoYRpqc0kBCQVrJl8hKAthJFiJg4YQbM1OxmDBWg6uFCV01nLWOF3D0vaalULKXEmlfSot/XJpRqsXOIqAX2GDQm2siF25qs1REvIr6nPx2zUi6f4+nsjF16CNWDL5IMWqtppRjdu6YUtRr2bKGFXtzxu0b1A6a3B2kBau5hFPrMLiNtJnzTZcGJjbLNduYzFZjZtKxkNH9+wRYDtKwEvR/idQFRi9sykbURgeMmgaOXAQK74v+5QFkbVBWL3VHoDai8h0mC/t8Z2/Ppv3ENsnMX0cU7+6ODC9AEclikLC5USuYTg5azjBqG94HBWkQTIj1tDZfwhCbPFLCduZoF3ImEy7FaosWzA9aG8Hu4hj2uPYA/f+OD771RvHWtXwn7Z2C45Mxnjord6L/+pybHeHyX2oibbj7Aa2T3q2P+SLrz9/WA2fBXAyKYPGj/1pnoxf6tfJuOHbjstujOv9wOzQ61DtIr1L0Q2YZuNMzw/VB9O/ZjrNrg/V3h6+kUL68SfUHw=='),
			this.addDataEntry(dt + 'card', 300, 224, 'Card',
				'7VbZbqMwFP0aHiuBTTLNY0MXVZpNSn7ADZfYGoORuc0yXz/emoQADTNN3+ZKSPjczZzjixzRrNw9aVbzbyoHGdGHiGZaKfRv5S4DKSMSizyi9xEhsXki8jjgTZw3rpmGCsckEJ+wYfIVPLIUKMFAHDR4Z4N7GZw5azjY1Dii84az2uIaVqbXvBBSZkoq7UJp4cyGoVa/4MQDznyBXG0NmNh0VeFJUOws4Avx2zYi6ds67Mj6N6BRrJi8k2JdGQxVbUvXbCWq9VwhqvJtvx77CoWlJpkeoaXNuU8mBmGhjHRR80CP6QG7QYodFPh9AlUC6r0J2YocuY+gaSCag1jzkEbIrQdZ44H1IfeomHkJovULSDsCLl5f8D0NzZdgl++ZszbfCR3BdynyXMJ4yrdcICwMbgtuzcE3GMdShmMwinBykfDkS9xDeMA0SIZiA636fSKEFj+VMJ1JvPcRk1k7QxVFA9gR7bCxUTqmHR07wr0/by/OOvNWqQo+SGs74ZTkSc+pPoD/ynJod5NMw3gE2s3puT7tkw7td9ny+cd3gyUXBTiblF7ih/6KZ+OXOjsbt+Rzx2U/pOttz+zQ66jalvQmjT9B0+mwppeH6r+mf63pbHp9Uc3yeAny4ad3pD8='),
			this.addDataEntry(dt + 'card', 342, 272, 'Card',
				'zZVdb4MgFIZ/jZdtFLTr9dzWqyVL9gtoPQopFIOs6r8fAv1wtWkT7VISE3gPh4/38YQAp6JZKVLST5kBD/B7gFMlpXY90aTAeYBClgX4LUAoNF+APq5EIxsNS6Jgp+9JQC5hT/gPOMUJlW65FypKyq6rYGOWfM0Z56nkUtkozm0zeqWV3MJZBGzrIpRksjZiZAY1ZRq+S7LplqzNvY1GteA+7I8DSkNz9UpW8vdZgRSgVWum1CzT1M3Asb8HBVZQn4ZevEgqJxTH3JNDpuNNGjYMjzVsbduFYTu5g4nsQTftQXE4YM9BVMCJZnvobTDkmd/jSzKzNQoPJ1q4jLY/PCwg87wCfWH58aB3UYhvU8hIRaGbHrpf0CIRTdGV2rwQGZ9TIEpfA/GH2sK2kQT6Cec8BnBEy0lozBLcw4GXD8CRTIFjLeVWELV9CiJRPFAg09THLIl6RJaPKJDFFEQUlLx9Chz/WCARTsbzMMPTG+6mnz/xvw==')
   		];
		  
		this.addPalette('gmdlCards', 'GMDL / Cards', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLChipsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library chip ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'chip', 170, 32, 'Chip with text and icon',
				'rZRRb8IgEMc/TR81Fazb69TNPWzJEpfsmdhrS0ahAdS6T7+D0qqpm10cTRO4438Hv7s2oouyXmlWFa8qBRHRx4gutFK2mZX1AoSISMzTiC4jQmJ8I/L0g3fivXHFNEg7REAawY6JLTSWdw07pdH2zKQB2fiNPYjgNwWr3FTDBjPMmd6s+ZczJDEujdXqExZKYAi6lEqiZ55xIVpTRCj4gXattjIFd5KJk1Zsw2X+Apk7OZk6oZI2RJ9Ql0zwXOJig7cDjDbfF9zCGoVuyx4poq2wpQghw+VAW6h/BORNgc4KVAlWH3DLnqe2CDvuGohxATwvgowGdMw067yTHnHjJBC/TJ/26Pdwp8wUHpGnG9iXde46ZpyXqRhvjUcxhPzMj6FgyFUwLYNLXDQIZvkOzsLfAmt6HVbLB4W8MjCQykPiHtdepvJNvcx47ZjfhOlccAgf4zhp1qfdNetDbG2DIYb8b4rjsbrkoxZaSD+6P4+gssyA7RWhu8WguiT/0cR1r1ZYmMyPzvMRmJGhlZn+WpnkDE2/LhfKMvtzF+Py+DNv4J7+678B'),
			
            this.addEntry(dt + 'chip', function()
		    {
				var bg = new mxCell('ANZ Bank', new mxGeometry(0, 0, 170, 32), 'shape=rect;arcSize=50;strokeColor=none;fillColor=#eeeeee;rounded=1;spacingLeft=24;fontSize=13;align=center;whiteSpace=wrap;html=1;');
				bg.vertex = true;
				var part1 = new mxCell('A', new mxGeometry(0, 0, 32, 32), 'shape=ellipse;strokeColor=none;fillColor=#009587;fontColor=#ffffff;fontSize=14;');
				part1.geometry.relative = true;
				part1.vertex = true;
				bg.insert(part1);
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Chip with text and icon');
		    }),
			this.addDataEntry(dt + 'list style', 358, 642, 'List Style',
				'7VlRb5swEP41aE+NjCGEPLZpt07apmmttMfJDSZ4MRiB0yT79fMZk4RAEtJAW01Dqgrns7nc931n52I5k3j1KSNp9FUElFvOneVMMiFkcRevJpRzCyMWWM6thTFSfxb+eGDU1qMoJRlNZJsJuJjwTPiCFpbCkMs1N4aA5BEFd2Q5N3lEUrBndKrWvwkZ5xPBRaZdnVBf4CYzMaflSCISNefGvIpmkq4OhqtNJtZPVMRUZmvlsmSBjAoPZ+gX0yLKZpGZ5rkmcJIXhtlm7vbTqxuTgOZkOLVk2CqWawedlxORyAf2Byy2o54JZ7MEhoto93M2wbY/vDmUM1hsx/mjvsA5JVOWzH6YDLhb06NI4c1lICZmiDOjuQrrp8kkeCwjJumDmgcuS0VCZYtkzM1wK8DwywDDbmHLKCeSPdPK+peA6L6Q0fFqBioczOKAD6RIfz2R7CImO82JqU5YG5EOhsXzTtpcr541+9ysmfd/F0yFtXn51RhXXn81qq4gwjCnspb1zadoBcSwBsRExKnI6VlqalZFVUJ3Y/vOcxoZviNGjE7rqRDP1a5sOQ3l1uGLfrod4bdVz3B0GQ/WVRF2irvXhQDLrFfQr+8wJdS4bb6Hzfk+IkO7SYZeJzIsJVKq0O8BjVEXaOQ0CVpqcQPQJXC0rpHlp6nsLLibGunsoWPbPcDj1+B5FBfURwUA1dcRYI4WScXsWpEc6+v8IqnXessieeFmaYD3+8B9XMc9o88q4xjdk0TprUaCPdxJNjWQDVFLaW6YkYlFEmhC2TXQsNtwhO0CRP/8ylsevHdBdbpR9wjtidvrAWQbdVF8Fzk9eBDdQ9jTF7AjTzVNbkO2gtXbQTQ+rbOGelvaLjm0l7V1J1PXXEWK0TfKc/FfDfBVtD81YOS/hhxe2mzoWg6t+hAtGhF9iaHeh/jO1aagTKHeIWREIRJK53AuOyGNffaef2A4vcm/q85CR9u+XZ7/utVAvT1xzyys5nkckvuk8PVmcPdZef1e5BDRkiQSaIukOhuiaUSnc1gygeCAACinQAgWQvRiAfkggR6EfKWGOzJi8G+RTkWs8NsyaKBuf8ICKveFXzIvHESoc0uC4nGRljF8IymBaV8gIWgB684TsdwJ4gMEwNmcllNmYhPukn7QSYmJHlbsodmzwkok+eAcOrtt6oAxNRES+MemhF8bgks42B6g+2GqF5b7koH26zHdRagbqvvjPqhebwC1K/dndH6QvhphuSTx68qEkzD4naBw5fbx/d/upB3zRFTJOdaOOYTLC9s09vHGABrstU4aD0xuHaqu+qej6nGpj/ap3aJzU2KlZrI0p+8KoX8foHrv5tTm9X7QGf1r8KjH7a+mhfvuj6p/AQ=='),
			this.addDataEntry(dt + 'list style', 358, 642, 'List Style',
				'5Vpbj5s4FP41UZ8mMuYS8jjJTDsrdbvVtlIfR57gBBqDETiTzP76tbkkAZuEgEnaKdJowDdOzvediw8emfNw9ylBsf839TAZmY8jc55QyvK7cDfHhIwgCLyR+TCCEPC/EfzY0GtkvSBGCY5Ymwkwn/CKyAbnLXlDyt5I0eCh1MdiOBiZs9RHsWhP8IKvP1sGhMwpoUk21FxmlxjGErrGZU9EIz5nVrwKJwzvGsXNmgpZP2EaYpa88SHbwGN+PsK03Xyaj4OVX0xzrEJwlOYNq/3cw6/nN4UC1MowJWUYXJZ7E1ymExqxb8F/osUw+TMiwSoS3bm0dZ3NoeHasyadicWOBn/MLjE4RosgWv1baMA6NH2nsXhzKUghs5AzwSkX60ehSTFi6wcMf+PzxJAtJyFv81lIiu5WgMFugEErb0swQSx4xZX1+4BodWR0uFsJKxyvQo+MGY2fX1DSi8mmWjHVCW+FkY7t/PlIbZYja824VGvF+7/SgIu1f/ndFFZefzeprkCXyxQzSev7X9EKCFsCYk7DmKb4ImtSW0XVhB6nxqNjKhl+ZIwQnLen3Hjujs2W4CU7DPicPT1M4G2tx57048Fb1Qi14u7oMMBS6xX05QhTQg3b6ttW6/uEGRoqM3S0mGFpIqUVugOgMdGBRoojr6Ut7gHqA0drH1n+mkpkgXp8pFlDxzAGgMeV4PlOe/hHDgDOrhPAnHSSnNmSk5xm1+VOMlvrlk6yZ7AsgHeHwH0q457gV65xCJ5QxO1NIkENd5QsCshs0NI098xI6CbyMkIZEmjQUqSwrVByL3etZWZ9jJqpx3wnoGa9zgAoGkCHd92kuDHTrEHoZJeAP40zHjwsg51YvR1E0/OGpHCoZVufrLx0nkeauidcUgi+YJLSP4PucDi6Q+Beg+9dywW6+d6qktCilDAU2+VKwlfC3TpvWmY+nvlYSILxWmRWZ7hfp+flIf98mP6lagOaArdRZnB6bUAuMDwFI8jnOUQo94Xj66zE3V981M9NKiTaoogJ2gLGszuw8PFiLZaMhHCCACDFghDBUkhPN0IfyMs6hb7igjvMD8S/TbygIcfvwKAxv/0hFuC6z8dF63wAXWa6RV7+uIlLGb6gGIlpn4VCwEasu47o9kiID0IAEqxxOWVF9+Ju8YdMKSHKujl7cPLKsaJROr6EzlYbP1A0qQgp+BcsELkvCM5EatpA92aq5y1PJQON6zHdAkAP1d3pEFSXSzjt3P0FtZvDhp4znvPvGJFjjDShAKeWjILh6imr2U4lBrtD7OeNruWVCzABYOZmJWUdMcBo2OOfA2WiIw5rqX50yVfaqca5OIc0FdUoU081yqjvmAahr1zwmPN4gBZCkAiFcnGYK7AeNRQ1ioMbkWoU9RjxQhmjoZQG2bYuwp9G1ZIwVdK/3Br3or9cZWBZleHZH1kA71AYEzzmyUQbpVu9lJ4HZrHsP2IsE8pwwM1AMK+IAuxaJODLBHGKBym8NumnfeVVsZeFPZOZfeUV1jxRDQUtngjKFYkOsWGn2o/t42fHjxS5HhvBqWYZjgSNIs90mzFoTeOb7f17pRkHCpvvL5oqTizkDr6DfzfbFv6Bwr2HgecRPKA7P42uq/BPg7lzLQcMbmcHrhz6fnszkPepfvYR5Zn9WXZgWOCKhnCVnai4tBcE3ioTzhZp3H6mUHLfGoT7Wra4L2ixVmUy+6SyCZeuGc7p9BOMa0cjlJ9TVJUcTeejJlWvNcTxKMWnfwm4czuBWyL0/gGSd8+NADUdxrgZOpP3Bg9/PJyKzocfH5r+Hw==')
   		];
		  
		this.addPalette('gmdlChips', 'GMDL / Chips', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLDialogsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library dialog ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'dialog persistent footer', 280, 472, 'Dialog with persistent footer button',
				'5ZjbbqMwEIafhstUxoRDL1ua5iabjdRKvXaDE6w1ODLOaZ9+bTAU6pDmAFJWoaoUxh6D/29mbGM5YbIbc7SKf7EIU8sZWU7IGRPFr2QXYkotCEhkOS8WhED+W/C1pdXOW8EKcZyKUxxg4bBBdI0LS2HIxJ5qQ4SyGKvuwHKesxitlJ3juRz/eUEoDRllPO/qLPJLdROc/cG1FpxfxQAR20qjLW/0wzEXeNc6gdyk336MWYIF38suWxKJWE8iKCYJYkyWsXYb+noqKCsMy8r3Sw/5Q0tyWB7HkGfM2FIqA8EHGbwSQyw5EaWLmhKZI/pEyTKVLQmJIppPf4XmJF2q+XtKP5aKN/JXOUNQ3uvRlEAcZ7L1Q09VWbYxEfhNjqK6bGXcSFssEnqOovAyRT1t45giQTa4Mf41Kg8Nld+kbIjm0srXXsrXahFa6znBC1HXtBZ5AVB/Ta1t+8v1nUkJX7xbE9s5V2z9iBkj8skQ7JvMSg+2WGRYGHCqFzuJl2vwGu3msouacwunuvhuIw9gO8WbzYSO4Dz2AcczkwnP15yI/anF6pMJwZLDWLTpWXd5cQ8kVlsC3hRCtxuENuyDoW8wDAB8sHfSNnqanVkL62l301k17AiJ3weSwEAyQ1m2ZTy6dA9wZM0C4NELglvj01HVg3YffB4NPpYfXlrxqvIGfkyratt2N/gctwd8ZUwcO4iUZw9KUlydMUpx1TYiZRP0iUstjTPIESzX6K4dwANwfe1VRzEM+kPRy+7Ots0dRCyPbEqMlor37VRokqGKy4xlRBCmEo4XWlSJOPnWXtVKpDOU5tl3XU1V16G48PLr22o5VHHC1mmUH33zeNIJ30/GHkhYeGWU7JrD7MvY6yV/zQ8JOmhQtEHpXKoIAVspvNndh09Vf3LS9v8eUG4vVcj89BI+TcPRpG1Nr6vvHNjqtq3RrTHR41LddNg37moMfddkOISdMBzYXpPioBy4W4rmp53w93Q6Ct/vCGPQI8Zy7C4pytuvD9BF9/r36X8='),
			this.addDataEntry(dt + 'scrollable dialog persistent footer', 280, 345, 'Scrollable dialog with persistent footer button',
				'5Zhdj6IwFIZ/DZdOShHES0XHG9c1cZK5ZqRKs4Wa0hl1f/22UBBScfygG5PBmMBpT9vzPpx+YDlBcpixcBf/ohEiljO1nIBRyou75BAgQiwIcGQ5EwtCIP4WfG0ptfNSsAsZSvk1DrBw+ArJJyoshSHjR6IMUZjFSFYHljPO4nAn7QytRfvjDSYkoISyvKqzyS9ZjTP6B9VKUH4VDUR0L4y2eFCdI8bRoTWA3KRGP0M0QZwdRZU9jnisgvCLIEGM8DZWbk7fLYxhVhi2le9JD3GjJDkvj6PJM6N0K5SB4B33XrEmlghE6iJDwuuQjAjepqIkwVFE8vB34RqnWxm/J/WjKV/hv9IZgvJZtSYFYigTpe8qVGnZx5ijlWhFVtmL90bYYp6QWxSF9ynqKRtDJOT4CzXaf0TlvqbySsgWklxaMeytGFaL0ErPOdrwuqa1N88H8tfU2rZPrm9USDjxnk1s51axVRdLikXPEBybzEoPutlkiGtwqoFdxcvVeE0Pa1FFxtzCqS6+28gD2E7xaTOhIzhDE3A8PZnQ+pNhfrx2svqgnNPkPBZlGqsqE/dMYrUl4FMhdLtBaEMTDAcaQx/AF/sgbNPR8sa5sJ52T51V/Y6QDEwg8TUkyzDL9pRF9+4BLqxZAAw93382Ph3NetA2wWeo8bEGwb0zXjW9gW/Tqtq2/Rh8jmsAX/lOXDqIlGcPglNUnTFKceU2IqXz8AOVWmpnkAtYHtFdOYAX4A6UVx1F3zeHwsjuzrbNo6iOg8ZRHBtt/CcwPdczAUY/rAejRTCdt01z9dXfObP6t01brSuXwdmr6dBKbeCe2TfAx6Cprnt2mU4lxbLhbinq3xSC34vFNHj7QRh9gxjLtrukKB5P3+SK6vVPdv8A'),
			this.addDataEntry(dt + 'message dialog', 480, 480, 'Message dialog',
				'1Zhdc6IwFIZ/DZc6gSjqZau2N91OZ+zMXkc4QrqBOBCr7q/fBAIKQYsVZndxnIGTL/I+OTknWHgeHZ4Tsg1/cB+YhZcWnieci/wuOsyBMctB1LfwwnIcJP+W83Sh1M5K0ZYkEIs2DZy8wSdhO8gtuSEVR6YNPklDUNWRhR/TkGyVPQFP9v+4oYzNOeNJVhVvsktVEwn/BWclkF15Bz7fS6MtH/YhFbDaEk91uZciSFsoIqaL9btBIuBwcX6ZSU/uGXgEIjnKKnvqizCvMZrmGqAQaBCKmpGkuSEo257kkjdasWb1sKHeK+ylIYI0JQHcJKWaJvUIe2A0iKU5or7PMsWkPjQOlCaukpzHYkV/q5Y2Lp71EEq0BFJZ+lNP365BinkMV/kQPTyDjeiIkPNdQrktAUYE/YRK//dQG31zzUeHQPnpMIh8NjyUKhZSO026utnVVincrFS1wVH79XCcP5/paI9MGQtbaxn1+G+cytcqBx/gUWX4waTaA99sUhAGhnIWrciMDTLv3GAjBRQnt3jJ1unJNc60nyL1a3AZ3fSdy9W8cBt95i+ue4zuA6YBuagHQK4BaLVbf6gN7AKlC9IX7tLMsNjO0BWm/z8gG417IDTpYnPTIam6v9lX40ZDkDG96h4qx0qDrxi5404YDdw+GE0NRg8GpFp28FWo0ZIzsgb2xlMqKFdR3JOqQnKWXbzUKgi1B5ZB36heJCNrLgSPqv7soJMHP+ryxQCbPlvGwFq26GVXg8+3WiaTG5eJ0xAbuwmNRdgq1kzRbadrZtaFXxMhiBdGmYbdZy+3EpmZQDoiMqnlKqM+iNioCyRbtkv/BRg9po52oVSBA8/6wGGbucnyddE2Makfo2p7mLOcTJ/OUpY8d0TXzm3GptpjytJ4QmjwuB4iZXE+mNUgdxE55ePpU0he/fxLyR8='),
			this.addDataEntry(dt + 'dialog', 280, 273, 'Dialog',
				'7ZbbjpswEIafhsusjL3N4XJzbKVWqpqtem3BAFaNjYwDoU/fMTgJCVltlG61N4uU2B7PPzOab5AI2CLfbwwvsm86BhmwVcAWRmvb7fL9AqQMKBFxwJYBpQR/AV2/cBu2t6TgBpS9RUA7QcXlDjrLzxLQsNE6lbgZ87wI2DygjM1wLfFK6ohboRVuSzCViFC47sKUtpE+TMzLDFwS4mQZL5zdQIRVzRMh5UJLbVpXlrSPc7NG/4bDjdIKOm2sazyHTqmV3Yo/LlY48+deJNI+TlTwSKj0WWPxy9EYLXUmLGzR7LQ19vvk5YI5Fy5FqvAgIXFVVmCsiLh88mbrgs0zm0tfjG8dusH+xfa3Jt/7DegcrGnQpRaxzTyCaYeIZCDSzMvohHVGXnaG9Kg90cSNB3odLhvA/Qq2BxczysLlKAoHNgYLJhcKepAfcP+cCXedA1dlC13FrmuoQ0RNrncXUxFzy3GxupcKayVQgbuus3ZR+pQZ+4X/ZqcUBn4YzBL2117AHw/hz9rnXvgGSgz9y2MJj5bPByjhHfDpffDDsTcakNjUCs4SXJsIn+O7FsoBbjqPCTlX6CQp3QBcTNCxspuG6nEwVMsv26fNj9XqFm5syI2uJtM1veRGXsVGrryjuYhjl/34LkfIAsyhCF/aG6I8FzRnpx7ma5Qfp/8G2aceHafFZx8dAr8p9k8D7B/M34/59D8gx+Ppu6Nz73+W/AU='),
			this.addDataEntry(dt + 'fullscreen dialog', 358, 642, 'Fullscreen dialog',
				'7Vtdc7I4FP41XNoJBBAv+/netDudbWf3cidqlGwDcTDb6v76DZCgmOCLmmx9a5npVEMC4TznOXlyOHrwNlv9KNAifWJTTD1478HbgjFef8pWt5hSLwBk6sE7LwiA+POCh46zfnUWLFCBc95nQFAPeEf0H1y31A1LvqayYYqWKS67Aw/eLFO0KNsLPBHXv5kRSm8ZZUXVFc6qo+zGC/aG1Zmc5WLMjbwVLjhedU63apJz/YFZhnmxFl0+yJSndQ8YJfWwFJN5KofFoZw4WtYN82bs5unFB2kAszGgZgxfzOUagoNsgiiZ5+XXena7NgJgOIpvumw0Yznf6vxQHWXnBZqQfP67fOJw0/TKFqLBl2Nf5BzLeRV4Sf7Ff0rLlT0+UsLxixhXdvkQTifaUp5ReboXQMFxAAVh3VZgijh5x63rnwJaeKQHZ6t5ybqreTalV5wt/hqj4iTPhWbDtAesJSmvovr7ltnCWLeaf6jV5P2fGRHTam4+GAWt2w+G7Suw2WyJuWb15il6ARFpQPyGP0QDfi9NdAiDzMzYpdEoThLl9cLPRXMAfs6gmi6DcmSJJ5kgei0Jm5HptJxew2CKZ3wz8rH6dhefHbWi4WlOsm4z1KpTxDbYudJ8Ql9rFBZBX2NHZmPvIagiowOCylW64efIARRDDYqX6z/uNTiEzXibVj7sSyuwj1Wy5w3jnGUK7ha1Eks86oDWGIl9DeYY6DArdXFqHI7bNx/sqhYrQCca0ClezwqW/c1yxFOUeyGYZ4jQq4kA4pDAbIzPwhtwdXRGzhK7eMenQmMU7XSezwyvsZXwmvgOoB5ZET8FQfm85miPlXdUHX2NnpyoinwDGyM7ZFQRsSGjA4DU9LcQuq/1EMhRhntEX+jr0XdcHX2i71hGWy36BsbouyFscm4qJ7FDQx+60L6+fyQRKcl13m1HVB2DU4y8UkQDoT/SuAYVI1oKB1ixe+AnLuyu5y8e2UTMk+V9hE34P1HLB+fNraEljFUGxS7Gelrml+SWwe62uJU44ZaeWXkoDILRwCvDkhVXx4XxKrSE78gJr/SEzUNBvEAMBE+ofLwyugLxb9gH80jHHFTH18U8AKatoh3MoZtYaiUf43TDsD+66tt1hxsEX2kWhUnoYg/n64mZUL51AM9P50Q9nXm7rxwc8q7TAYYOSNjkzXccwA0p9YTNNyn77todcfLYxMrFaM5G71i1e6CnS15ZnxD4rTjtqo/YCbp6luRbcZ6P4nSyy1CB83txO0ZxhupedjHRMyrRr6I4v7rCdENCO0UyF0LCHYXpiIN69qUfJBejMMPAiQY5NgNyMXaPYif+rmc5rikd3KH1EZFokuLJ25gZ64Ia2b8djmSE0kuFKBpj+syWpHpltCnaVGvW4875rhqxn1W9yPUMAsNCal8m+qZSwhPfn67al1EkVdURdp1Fz4g8CzPOyEQ0vnCUT1ExFR9fSa9X6GI70S1XeiJXFbCc1VbPP3G5U3SHThA8/8qU81UcEXRR/wf13Eo/SA6qypWssrsYdtbqmXMgiRViDEIX+gMeWynSIsYYTd5Mi19TFNuFy5HFsrXv7FEpigmfUz472KnkclHiA3skMhRWYiRZLI1y8dMQ+voA9agT2RvSPhOd4VeDxyuLRdSv2Oru2z9y+w8='),
			this.addDataEntry(dt + 'dialog scrollable list', 280, 270, 'Dialog with scrollable list',
				'7VhRb9sgEP41fmyFce24j43b5WFZF62T9kzji42GTYRJk+zXDwxO4mCnqVpLWxUkS9wHx8F9H+hkL0iKzUSQZf6Np8C84MELEsG5NL1ikwBjHkY09YJ7D2OkPg9/6Rn161G0JAJKeY4DNg4vhK3AIAao5JZZoMrJUncFzNWS4wUv5RP9oxE/1jZlLOGMi3p2sKibwisp+G84GIG66ZGcpHyt/ZVh44OQsOk9Qw3ZA0yAFyDFVk1Z01Tm9hyxOSfKgWa5dcMjC5LKANnOd58S1bFZ6c5Q4GTokZfgZCklVQ7aBZkT1ikrNplm9jorUnYtSEr580pKXh6lMbT2QbJQ3fRSSzKnZfaTL5u1DaAsrE1GnoHNeEUl1eveC3P8sc4onRM2PRovaJrqPY8Jo5kGGCwO599ZeDfP8PjLphp3MRvVTY3ksmBv4RW/zmsXrRYTwIikL9BavotqG2HGqQqMUbOfyHhsjRmG7QX4YlGBdJSy2+ZZ4rlxxJMQxmgl+UVAn01APsIDKCh0FDQh5baA9PIEfT4FhaMBFBQ5CpquSnJRT2uzt1HcUczs8P9ZVXiQd2nkqGqW13UR+qHIlV0l0olCcnRKQL2FZF/peaSMveD8qIlrd6UJFVCpXTT60Mg6pxKelJeeslYXYBgFdJWsYfxGCZxbxsYOX/8qPy4f70n4tuXwavrx+26gjXYVDnHlbt1i8u4xeZg6RKo0HRMYdBFoHzfnhe7S/54kdOqxbaidK15AdNy2D7pHbYdekqMBOLahr/wb1Io+DOk+clj//vXCeC/jQ9zqhvF4AMKVuf/bY6Yf/gz6Cw=='),
			this.addDataEntry(dt + 'dialog scrollable list', 280, 112, 'Dialog with scrollable list',
				'7ZVda4MwFIZ/jZeFqOvXZattGWxjrPsDQY8aFo3ErLb79TvR1I+qUAa9W6CQvOe8nvg+FC3XS88HSfPkVYTALXdnuZ4UQtW79OwB55ZDWGi5vuU4BH+Ws5+o2lWV5FRCpu4xOLXhRPk31IrPioDKEMVQ0ggfsq9bCnXhpqVIaK63EgKsbyORqSP70Yq90mfGuSe4kFW3G1UL9UJJ8QWdClRLVxIailL7bx63NOeOaVEt1ClncYYaB33LbZHTgGWxdo1UTyAVCyjfGFmJHNUyYQqOaNTDSoSAWqJSbm5iskErnCfzrSQT7gFECkpesKVkoUpMxquaAUmAxcnVZpvoaVELceNtceHGEBun5w7oeZs3b/cyIIYvcEvKHUZLyMrd222Wnzokn0wE1QZORgJOWRjq6Q2IABMDeb2EuZr9h8Cd8cD7hkvv1IGxHGExNygkcKrYCXreMT5m+rtgeKlm9MxekN702fyGsYiiAtSAcPMWd0F/Gv5ln4/e5sP/pz5Jff1A6usHQMdj+w2o27ufiF8='),
			this.addDataEntry(dt + 'simple dialog', 280, 250, 'Simple dialog',
				'7ZZbb9sgFMc/jR8b2Th218ctvbxs0tRM2jMxJwYVjAU4l376HQy52q3SqYo0aUSROP9zAZ8fviT5TG2eDG35D81AJvlDks+M1i7M1GYGUiYkFSzJ7xNCUvwn5PENb9Z705YaaNwlCSQkrKjsIChzcCgsaPXStTihVaU7rNWHWbeVMcxy2vqpgQoX+rYUUs601Kb35st+oG6d0S9w5IF+eA+nTK9RzHy6btxcvPqCuOFgHyWl/UCdSlE3qElY+lVtSyvR1L5IieYKjBMVlV9jlNPtrnbceHpI+uWd9zcFKngNnbFiBc9gwyZ83JoLB3MM9sIaCaHGnZJxy7FxuCRs3mx+L8XOP4FW4MwWQ9aCOR4BfAmAUg6i5jGNFFGkNgj1PvfAEicR5zjafIC2s2AaqiCZprWiQk4qrQZgGbUc2K5XkbLa1P6ITmrF5MSXOWWWFZ/GTAnG/FbOT1TxcHf7WA5OVKMbHyzpAuRPbYUT2lcxoZf76t/P/PtVPgqUjAPdJRQhYxvMMppHuKcjtKefAHs6Cjsl/1FfB3WWp1djXQxYU8YueFRjFdFauDrPBfO/f4zn3fXu3XLA8y/u1FZ2dux9e/Ym/h0vh1zateL9rpHTrpFB07Jy2LSd9oGmoXn4KOp9J99MfwA='),
			this.addDataEntry(dt + 'simple dialog', 280, 250, 'Simple dialog',
				'7Zlbb5swFIB/DY+puDQheWxol0nL2kidtGcnnIA1gyPj3PbrZ2NDLoYmauFhCKRIcMyxT/x9YMWxvCA5zBjaxD9pCMTyXiwvYJRydZYcAiDEcm0cWt6z5bq2+Fjut5pWJ2+1N4hByu9JcFXCDpEtqMgipimIEMNpxPNTeUPGj0TfkMVoI08ZrMQQ0zUmJKCEsrzVW+eHiGec0T9w1gL5IVtiFNK9CDoynab8Hf+VHYpS1fVZkp0fMmmDVqKiX3QjGgb+KVIkErQEsqAZ5pimIrgSMwCilykiOJIBAmtZ7w4YxytEnnSYyx6n+xhzeBc9ykL2AoeIxTwhuko9SyIVDrUznYf0NM+AJsDZUdyyxyGP9WyPFQ07BhzFOm2oEdkoU4GozD2BEyeaXTVHz+D4WsUuRFkMMsVWHHKQySGS/j1ESUgeGAoxXW45l5N4TscZ3UvHvg2Hqa9fwphftSc4DGXNt+CV9ynbfuupdqv8G+XHJ7i6t7lWYC1iDAjieAcX3Veh1iMsKBYDu3ZRz0hlHNWlf9UBXa8z4IYpZZl3yfNoyBMgQnDGaS9Q1wRyild+owYNDYOecf/+6aI+vteCPiNDnxlKjwmEvUGdM6hcbho1yDcM+o7SiG55JqJyNetF6pxI/rAFkcaGSPNtinp7LoqdjMZj86dfGf+frfKKxahRqyaGVW9LYIJQ71XH3kqe77fgj2MbAi1iuqRZL1DXBHoslqBmBXIMgQx1rjf2zszwPzKjdqOvbmvwCvnJpNxABpkYtQD9VYbHi4Tbe3FfQ6pHGxT9NMvQ3KwNnl6Dl7lBUszTNUGviqBer41nu2o39ETJ/ugxLdiW2695Ebo0p7ln8zKhlrLfAmQ99MAZ2Rejt0Td3Np9+9ETryU+aZH4pAXg4vL0d4+6/fzfoH8=')
   		];
		  
		this.addPalette('gmdlDialogs', 'GMDL / Dialogs', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLDividersPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library divider ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'email list full bleed divider', 358, 642, 'Full-bleed dividers',
				'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'),
			this.addDataEntry(dt + 'full bleed divider compose email', 358, 642, 'Full-bleed dividers (Compose email)',
				'7VnRjqIwFP0aHjW0BcTH1XHmZSfZ7Eyyj5uqFTpTKIHOjO7XbwtFxaKiwLqZTBMTub2XXs7htLfFQtNo/ZDiJHzkS8IsNLPQNOVcFP+i9ZQwZkGbLi10Z0Foy58F74/0grzXTnBKYtEkABYB75i9kcJSGDKxYdqwxFlIlLttoUkW4kTZU7KQ95+sKGNTzniau6JV3pSbSPkrKXtiHsuYiR6KpIKsj6abm3SuD4RHRKQb6fJBlyIsPJDrF2EhoUGowzxHJ46zwhBsY3dPL/9oAOrBQAYYQObyDdmXYcJj8UT/KAtA8hozGsSqu8j2ELMpBL47OYaZutme833elHOCFzQOfmoEnJ3pmSdq5DIRnbPKMyWZTOuXRlJ5fIRUkCcZp1w+5EsobaGImO5uRBi8jjDoFLaUMCzoO6ncvw2JzpVvdLQOlAqHQbRkQ8GT33OctnqTUT0w1YCNFunQLa73YHM8EzVwKWp6/B+cyrS2gw/GsDL8YFS9A1+tMiIM1LdP0YgI1yBiyqOEZ+QiNdWroiqh2RjMPFT7hu+JEdrn9VSIZ7AvW0ZWYufwPb+6G8HbqscdtXsPNlURdsq714UAS9Qr7JsrTEk1bIq3W4/3CRmCOhl6nciwlEipQr8HNkZdsJGReNlQi1uC2tDReI4sn6ayssBu5kh0wA4APdDjG/SEZLNKefTCYyxCHFuOHUSYsuGCRwZzJ+dKSQbJ2wmS6ic5NYF5NZXMf1VAuC2XQk2r3wer405qkJTiOFD+jYTn5a0p6H5L4QG7hpGOdGdXdYd6IKhMf4+hZ35reR3UJvO8fVLZgXJ27ZZWYND69DZ/UfR9cfvvuPXHfXBrHlU8kizDgbmfkNCIL4ZO1v29TKrm+UmzZe+CrZ6dt1pa2uC+qQScY8HxO2Fh4PRR8INODkDmePF6cv91jJcr92Xg9GmJPTzYK9XWJI5JVVcHJqNqTdLHeQkwD0yOrloykiaZWRrekqHPT1CDk41zZcXN2Bl9Nnrk5e4zSeG+/xXlLw=='),
			this.addDataEntry(dt + 'image based content divider', 358, 642, 'Image based content dividers',
				'5Vpdb5swFP01PCbCNoTssU3XStMqTeukPU5OcMCqCQhoG/brZ4NJQmxSEj7yMaJI4XKNb86558bXxECzYP0U48h/Dl3CDPTVQLM4DNPiU7CeEcYMaFLXQA8GhCZ/G/Cx5irIr5oRjskqbTIAFgPeMXsjhaUwJGnGpMHFiU+Eu2mg+8THkbDHZMHvf7+kjM1CFsa5K1rmh3BL4/CVlFdW4YqPuZdTkTgl69pwc5OM9YmEAUnjjLt8UDf1Cw9kT4thPqGeL4dNLBk4TgqDtxm7/fb8gwRADwZSwAA8ljtkHodJuEpf6F9hAYifY0a9lbhcRLuPmWOLVx1m4mY7zo/5IZwjvKAr76dEwNqafoWRmLkMRMYs4oxJwsP6LZEUHh8+TckLHydcPngScpufBkxebkQYPI0waBW2mDCc0ndSuX8bEq0TMzpYe0KFYy9w2TgNoz9zHLfKZKQHpjogkyId28X5DmzWREUNHIuanP9HSHlYm8lHX2Bl+pFTvUO4XCYkVVDffItGRNgKEXds/hYkR4lJL4qaqqMm+I4WoanKycwPbhdU0gVmd1KrAXVdEd5GvIws063GvudnDw7cl93IOq+qbKddfmRVcXaaD5MuhFnyUEmL3Sq6mxsyXQrnMi1gUwpsPQUHFAt0ip10otiSkVKw0x4IcrogKCE4Xvha1Gup0fHYhqLGJVYujqo/TGY3JRY5VcaA2QNlU4WyZ5wprB1bU/Vrjw01B2siMKtlF/RcESW8zlQhV18gzXoim64wvnShExpgT6uAeX4c+JVrg9a6skbKykWuCh4AtqaWlcY26JU6uGL4QBnyeQAEVw8gtMxzAnhq03s5AFYFDC1nSPjUNvna4NsX8MAAdtKiXpSABwZQbS2/vfEly3+47kETqADf28IHdNLCXVDhtICKXo9p20mDdVGFc2AA1Xbn2gDcL5wDA3hrrYuNwIDwwdtrXQYG8PZal4EBPLV1OWI7fbMprm6nt8Evqwz4bLliSVvLjeyR1cdGqeZB4QlpPMeLV10Wb7K1jpcT97M/SWxzXD6xObTDbWkSu6NnUnv7pX08kmrycLDkio+kUaKtM2dj6PYJUju7WoK0Je2c7Di3Rg8/3f4TpXDf/aPKPw=='),
			this.addDataEntry(dt + 'full bleed divider', 358, 642, 'Full-bleed dividers',
				'7Vtdk9oqGP41Xq6TgJ+XVbu9OZ3pdHfmXJ5BgwnHJKSAde2v7wtJ1g/immiyurrpbBUChLzP+8LDI7TwOHr5JkgSfOceDVv4awuPBecq/Ra9jGkYtpDDvBaetBBy4K+FHg/cdc1dJyGCxqpMBZRW+E3CJU1z0gyp1mGW4REZUF3caeGRDEii8wWdQfujOQvDMQ+5MEXx3Fy6mBJ8QfM7MY+hzih7FBWKvhzsrsnK+vqN8ogqsYYiK+apIC2Bu4O0WkCZH2TVep2s40SmGf5r3c3bw5fMAMXGwJYxXOjLF+xUsgkJmR/rZNq7fRs5Tn/YGx2y0ZzHaqvwo7l04YTMWOz/zN64s8l65glkuFndp6yPTp5mf3TSxZAWVELq38ySusYqYIo+QTu6zAqcEPICFYXZ7VKAodMAQ500T9CQKPab7rR/DoidEz06evF1FLb9yAvbiif/TYmw0UMTPBz0zvJwXGyw3QrrLHjb3TS9Zc5Oz7amW9Wa2fN/cAbden34wxDtPP6hv9sCn88lVRYar29RCqCuBdAjBTR054lHRaVYK46h/YAb9gaDQv/fihDkHI++NNQedCxpjNmMhF+yYI+Y5+kOv0Z/SOdqU/Mfk5r00WWDrts/z03Wu7Fbq1v06ojbRNA5BTPNqCztHR2ER2Xt3i22+xvRmttqJ1p7tURr3kwerIMGUOnXgQqAArEXWIhsm/8QLGmNPGjRmUCVHmTdokG2Htgeet3mcRvUgRt0Q8Hg9a6hVBqhbnMA5THbJEDD4wCdxLXhDjVXCqrHVxnCV8X+XAfXMhMN3AagcR0LmwlZpwQlSSi8vdeG1HNA4X9Fo4RKZZBjphlBfENnVgxMgJxl7LGIxcwE2z7EYFp1AIk9LuKYq4B5KE1K9mnHNvXvbmiITvY2yRFXikf5CLDDcfTCp8BlSvnE8KhPoE7BrNhzKrpE2RWB61p4jrmIDUhTSue6+4LLGVuCOSDhCw6gtdvtKnDtEr1tK+drtu28VvEK7RDmx/HqvjtcqCpcxRHcaWJwdW1ZQwe1A3H4rpgiG9Ohuc7AtOoIfVl4+6gJeG2h5gR2ExHhs/hnOrnqOfa7ychx2+Rk+Kdj4t4sPJrof2fpAQcAetkDZ5uc5v5dOKWeNVSWUE8+aclRr3cHTayQXVs5AQ4iNAtZpR8SmtMfwAUkfHI9tRH4A7oQ6a+6izHnlQbBj8tDUme+JiJiaxzPgVlgAY/UzIPG//P1h2cdVYP1VJyumoHYwomru2/Lm7fOPy6MbjMEpBZ55VoIyCGELsNAPoWROtweDZr46QbZysjjMtazl+CJJgN6DpMzQEfeCcW4Nq0D2VpHqlPF5uHQM6LZxoxH8Brm0aHu768lo0qLWk8pgzTMUZmKkrBQbigm8QmLP74yUnkWu+wyOt+CUG80F6gkd8pRblAkKdjN8pE5yjWpJGX2mHxylOOD2rCRUc1WSX5wsYCckGv5Fya0pSS+mdoCEi8AMASNOgtGwymRWi6ZkpnWSPIfBwSb3gmdQdemmBTsCpmIZSTBjhpRtRQLujZI8mVoNg858tcS3ugWfr2pHM43qKMUbEBB98lRLoxuMxzlpnSUQwhdhqPcu47i1jOoDfewqMXvsa2jjAMqzJtNQy4lj/SS29AVSMO4ch/049rUFGyrKU+J0PaAMtL0IhVFYs8oJPqraWAR89VdUpAblEmwLZPgO6UgNyiT4JuSSa5qMwk+9ShOpcMd2Qh36pRTbK/1ToVjZCNf+Zzp3w+NrKCwrYec4OBTAgvuAir4ShIP4XLi/n38Npd22mh3E33hHv6ioxc1HZTq7zy9kXNSuMSJmBwrqMkSSa8KodsHqMThmDeHtEui0781eCC5OTadFt8+Vf0X'),
			this.addDataEntry(dt + 'inset divider', 358, 642, 'Inset dividers',
				'7Ztdb+I4FIZ/DZdUjp2QcEnpzKxGO6tqO9JerlwwxGqIkeNpYX/92vmABJtOIPaQDlBVwo6dhPPkPXbeOAM0XW2+cLyOv7E5SQbo0wBNOWOi+LbaTEmSDCCg8wF6GEAI5P8Afj6y1cu3gjXmJBVtOsCiwytOfpCipqjIxDYpK+Y4i4lqDgboPovxWtVzMpP7v1/QJJmyhPG8KVrkH9VMcPZCqi0pS2Wf+/JQhAuyOXq6eVV5rl8IWxHBt7LJG52LuGiBgqjoFhO6jMtuI788cZwVFctd3/2vl1/KAJiDgbRgePJcJgicFBOc0GWqisXZHcYIPqBxNDoWowVLRa3x5/yjGq/xjKbLv8tf7O+rvrO1rPDKvk/lOYKqTP9TRQ/JMieZLP1TRlL1eIupIE9yP6rNm7wIZV0sVkm5uRUweB4w6Bd1nCRY0FfS2H8XiP6ZV/Rqs1QqvFuu5smdYOt/nzE/lV6rgCFzwJodtqV474KiXAunP9Kj6Z0azfL4j4zK09odfDiGjcMPw+Ye2GKREaHR2P2KVoACDdBEbT9BYWblNEGhsR+OQ+NVX9MFBD/XXCGwIapJOyELsW/wZ156COFlFRWE3a6BbVOYVpmPbIhyzcmCyDDNSNbyItiNR63iHpjj/o4Uq1g1pDiyIsVqN5USIwdUQiupklOcLlX7XiDxgEEZdogAv4kEOUAS2UCSEcxnsQakHv06lRJU0bhKlLAjotbDmWcazuxoaDgK3ItobIeYEHIk+aV5rTWhwB0g6LsHVGWEGqGvOFW7BY+Ev9A0awfsvcnHu5MMz9cnGSD/yHrFjs5wMimnFis6nxfJVJ9cHEw/LjnX6JhSS96R54K3Z0WRIp/+t1Hjg5xsjj61vsEFJ49p1Y1p4/7JszOoHUwzPCdEznUZGkR+ZKQtkQiov65EWidIZBjCkKUMGYADQE5SpO58fMN5DL6yOM1Y2ssM2e+7MTsZ0quuI7u8rZgk7gTZ1SL5+ILUTZJHImS4IZhinmQ3SV5QkmMnY6QVi8SdJLveRHx8SepuyXdOXpnS5B84zchNkZdS5M4StwvcihfjTpHh1SuyhfVSMUlozeOqxZzkH8398oxi7CKFTQUCguoeq36HFxlgRFbEgYALcUDdVJlgrmYl4J6kKRHilg0vlA1RpQu7wHVXZaIhlkERBw/YDJh2fslRTIdPsitsMxniPJ22w3CG02J4oHPyk+qWTgt0QanfTssxItczZhnWmEyen4kKwjTmNBPkNpO8ZO4MXTz9trMmxZ0qr95uMa5JoUqTLE0Z7+cDomvQow+dzGX67bV0fmD78fWoey2TREYMgr9IcvM+L6jHyMn42G+nBV6902JY5DJJRcxSFYYnQV5JTxdRXIMmA+RijES6wdMrTY6vXZPo3GUuJyyi3gnMrhe6bXT4mUx8Oz7o0HdCwYrh8oxnLyZ32rhcs87lzDWb6MhbNnuTurlw0rhu07T22dJrCGFTPy7eQkC6EaOBq1jJnnSdkV4R+v0BtTBN3k1pl6QT/m54ZHH/UmLRvP7O4v8=')
   		];
		  
		this.addPalette('gmdlDividers', 'GMDL / Dividers', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLGridListsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library grid list ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'grid titles', 358, 642, 'Grid titles',
				'7VvRjps4FP0aHjPCNgTymGQ6syvtSKt2pX2saOIALQQEnk6yX782GALYJCTY7YSW0UjxxQbnnut7ji/EQOv48Jx5afCSbHFkoA8GWmdJQspP8WGNo8iAZrg10KMBoUn/DfjUcxYUZ83Uy/CeDBkAywHfvegVl5bSkJNjxA1bLw8w624aaJUHXsrsGd7Q6692YRStkyjJiq5oVxysG8mSb7g6s0/2dMyK3wpnBB96p1uY+FyfcRJjkh1pl7dwS4KyB7LdcliAQz/gw+YWn7iXlwa/Hnv69vQDd4DcGUhwBqBzWSLzKp94UejvWbOcXddHJnTdR9Dno12yJ43OT8XBOqfeJtz7H/k3tk6mf5KUGgAf+4nP0aza4X+sCRBtZzinrX+5J9mItyAk+BO9DuvzRoOQ2gISR/z0IMDgbYBBq7RlOPJI+B23rj8GROvGiI4PPluFD368jR5Ikn7+4mUS9BYOWn4YFeFI7rD2gCNfvA922W6405qL3gTXepPf/+8kpNOqbz5bwNbtZ077Cslul2MioFF/i0EA2eNSjnzZdFBCy8WTJQ15nTEN4HwcDMf22lDq9rmKdRHhnYgBc7hr2XOzPlM5HA51uH3R4UAW9SPdzedTRWTlfVOD9x3B+yTJDXaruReztOuT2lcNRKjPSDuTs2/RZQnbWVtPdpcSZiznM7+HGy9aclKKw+2WXVxJ6u9B7dga0MDQlmB4NQ/Il8zM1oGaK6C2wt4muBGmLpm/V5hg5UuVOB3aIaAVtoWKVJdjL6NQn0t2TdbhRKQ2/x36INKYDWcO0p8OgakCohjvX4cqggozPXDIxIAiOJDVggPokGQAKIHDy/xw/7GUaUytvRQGo9yunAyrhJAkZqkPtuzV5qYwd/BbPbK/PrDpdLbJG5+bqPlKyx8VOKCdQ2UpdlCUXFaJwFlIAqMyjqQ8oCV3ArEi8OfL82cLIPPha+qrC4u/CinZCY0qBKA8YGBfAMgw7LBvXZvo5dpq485FbnP73BBXbBrmqVnPrWErib3LECwLFQe1J6wjYUBCWxqy13I86Kmb9JK8NDSriHqXYgyI5ZlQCMcqAunQMM0lRLApjnPll6qEAsQYWhRHJzYGkzzoSRiDd/46Wb9DMzNXB4IDajMigEPoHSwf4XC1dTlxWxIFbI1cHNV83DafIy1r5dYiSytzp9FrrmO3X8ZB70KoQ//cUrAkS0FREcxprwQtgktJNaZfcLX5s+Qjudi6b63VjZg7115ilYhrL6BFe51RWWKgWD3wDXmMMXHtNZ++9hIrYXemvZxfXXspKYoNZZxGgtFMLhofYdbRAB3XnQK/QLHqxvkFquWXc/Hwm0Ok+WkxeQ6BYpHxvjikXD6/MIdUlPFjOGSaO5TpkYpYluOkgn5vWt4v4VwQPZMgHLHceGeEM/ZVsbsnHCVlzPe3aRlDKCe4bWc+kEBMNctUE4H80FqoSlXRwlTtq4b9pfCpoC7WOoehfs1roBV7qsWmlyKlL4VarhqKtLQkWLGud8Pa++JtvgmQNBVUHy43Pj+C54t5VFtP/gHSkHfcLj1K/ZkITR4gNOANt7Mp7Wei40wNHto8/aaq7N78ydX/'),
			this.addDataEntry(dt + 'grid style', 358, 642, 'Grid Style',
				'7VvRbtowFP0apO6hVWLHCTwCHXvZpmmdtMfJgCFRTRw5Xlv29bNJAgQnrQMxtABVJXzjmzjn3OPr3JgOHC5evnCchN/YlNAO/NyBQ86YyL4tXoaE0g5womkH3ncAcOR/B4xqjrqro06COYmFiQPIHJ4w/UsyS2ZIxZLmhilOQ6K6Ox04SEOcKDsnE3n+wSyidMgo46uucLb6qG6Cs0dSHIlZLH0G+aUIF+SldrgrUz7WL4QtiOBL2eU5moow6wFRN3MLSTQPczffyweO08wwX/tu7l5+yQGoBgNqYLhyLH3oNMIE02geq2Y2ul2MwD3sdf06jGYsFludR6uP6pzgSRTPf+Z37G1Mv1giDW7u+5CP0Sna0T/VdKFsc5LK1u8cSeXxHEaCPMjzqD7PMgilLRQLmh82IgzsRxjwMhsnFIvoiZTOfwiJ3p4RvXiZKxXezRdTeidY8meMeVP2jACD1YCVHZa5eO9Q1t6C0/N1NN2maObX/8EiOaz1xW97oHT526B8BjabpURobKzvwoggpBE0wk+My0hMG+msWj9lumDPC3pBZexvqUPh8ZbyMpndKh0pfqMJpv1c6ItoOlUDXiufkpnYeH5dte4DcFrBoeCwEFmWddtqSPhtaDbhZEYkTBMZR2bRsU5XRrijatxfUWqBVUmpfitKLU5TCLVrgZWgDVZSgvkk1AjZRn+blZyorHMhV3AgRcZTq1s1tbZD2K2P7DPWbYcxIeS0dVQRGTOE7BFUqNUmQT2NoD7mLJamAYljCXyjDKgnNRPCnNVH2pnKT0LdLthdLnp6Qly7fdD0h1pJf13XQlS4ztu6LajHE6EYsSDNXvP8BnSci4elA9UIdmZLF9nA3dXlOB4TddfDkEepIHFK4qsk37ckXejbiA2Dyoh9Tbo15ZBzFqVehZFhrSTJ4pjxZs+IVzkeX449KynSoKxzBDnW1G7OWY56uaZPJUTA+U5oyq7Z8Z3LcV0ubDcqDCo2R5DjHiWZjy5HvSjTj0XIYnXfD4I8ySXrVZLvW5LQsZIhDYo/R5BkcHmSrCjqHHnBuimlXvVnoD9kIyUCS0Wcwb36M9bf5VVxgF7FaSS5RgLT9Wkz4P12At5zbSScAuYD37QTSpJw+63PG290R8gdIGPc96ifODoPjTcrGMoB2KBFr5/c+Mj5JE0IIXlN6Gk0SQjFcbKHpT0ozWmu3pRy4LRXELvr0g6xegnkGxtHEngDOqFOJ3K8kTd6jU6drCMtD05Fp+keo4o9LHtMfSGO5+yvaQpqtg6og9D8VXjQvjyKN62eszMPOjbksu+mkstZFgRW1sF6heIGAljkHz/o9qzln5NNWP4l5B+9wPCb8cfzyz6nItM4++gFh/eWfWogvJzsAw2qAYdmn/V82G72WZYc3opyr9vOlOXZ2G4F9y0NlJQyxpNHjZK6DYzbvOy5izGLnVr1OHc7z5GVAqraetrSJvGgrB8be8ShQW2h4Ep6Rkmq1w9OydD5E6RXGWoJqpzSTslOcG70yObmJ2NZ9+1flP0H'),
			this.addDataEntry(dt + 'grid style', 358, 642, 'Grid Style',
				'7Vtdb6M4FP01kboPrcDmI3ls0sm87EijnZXmceQkTkA1GBlPm8yvHztACjFpDLGbNg1VpdjYYO655177YAZwkqy/MpRF3+gCkwH8MoATRikvfiXrCSZkAJx4MYAPAwAc8T8A0wNn3e1ZJ0MMp1ynAyg6PCHyGxc1RUXON6SsWKA8wrK5M4DjPEKZrGd4Lq4/XsaETCihbNsULreHbMYZfcTVmZSmos+4vBVmHK8PDndbVY71K6YJ5mwjmjzHCx4VLaA/LLpFOF5FZbfAKweO8qJitev78vTiR2mAdmNAxRiuGMs9dDrZBJF4lcpiMbp9G4EHOBoGh2y0pCmvNZ5uD9k4Q/M4Xf1XPrH3UvU/zUSFW/b9UY7RqcrxH1l0oSgznIvSz9KSssdzFHP8Q1xHtnkWTijqIp6Q8rQWYKAfYMAr6hgmiMdPuHH9U0D0enp0sl5JFt6tkgW54zT7NUOsK3paBoPtBmt22JTkvfOLcs2cXqBa0+1qzfL+32kshrW7+e0ING5/GzavQJfLHHMFjd1TaAHkKwBN0RNlwhPzTjxr508TLjjywlHY6vs1dkh7HGNeQbNbySOJbzxH5L4kehIvFnLAO+YTvOQvPf/dlh5CcF7C+eFpLrJp8taoSwQmOJsxvMTCTHPhR3resUtXWnb32+3+ClMrWzWYGhhhanWZiqhDC6iEJlDJMWLzSAGkbv06KiVQReOKruBEiLRDq9sWWs0Adhv49hEbmkGMcxG23pRE2gj59gCq2GoToJEC0D1iNBVVY5ymwvCdMqCa1HQAc7aHqKcyP3H5uGB/uuipCXHX7YOmP99I+hu6FrzCdY7ztoIezblExAI1R93zG1DtXC2WTmQj2IuWrm/D7q5Kx9kMy6eeRCzOOU5znHai5CkEfHWOeqXkIUq6MLDhGxrKiH1OugfkkEsmparCCLeWlKRpSpn5NeIOkSv/+vFvZCUnaug4ffg3fpB/2vw7INZcMv9UfeYtKWfT4QMzDr9T4Mza3YgIwjHBWVRfRB8RyKa+O/a16dBDA3FUHDprv5p0ADZgUVWQm8B3/hFVvu+Le0JPgUmYkJvIHio73iaf9IC5XeM/MexVwO53MQOsKpZ8o7NYGF4DTqjC6Tve1Jte4ezxysZVZZEeoS9C6Yr+1k1BHecBJyuLoXl6VMKV5+zFQccCXYCGRvG5pwXQtRGmgKpR3EAAq/wThMPRxeWfwtcuPP9U/KkB+5Oyx4vLPmcDUzf7tGz7eGfZ55AJP1H26aAGkLhl9VOPd82Xi66OEHtK+llXuACnyhD19dGw5Z2jocAFQxsL1ZYNHNeZQNPuIyt2NyIQJCgm2m/j6wJBz1fy72vbxFu8423ZNyEy7bxUrz0Hr1GSEXw3p4lOsv9YM7fPoBy0bLP4jllOU0R0AP1Ys7f3rh20bKm4ZqMGCTzfBgmgqgcIj/z1ScJc970SHy/MQVV5uMwF6rnA1P4sQVUKjIe4HdfMhrhNo8MxC3pDM3TwbEzroBGZYIbmj12m3wcWrdrTb3h0Udp8idaqHrTNxw19cBA27m7lewPYQTsQPeMsb5UPzobQ5QOkISi8GtLOiU54afCI4svnh0Xz+teJfwE='),
			this.addDataEntry(dt + 'two line grid list', 358, 642, 'Two-line grid list',
				'7VtRc6o4FP41POpAUNBHtbf3zm57p9PuzJ3dl51cjZJpIG6IVffXb0KCQgMuKqg4l07VHBISzne+j+NparmTcPOVwWXwTGeIWO4Xy50wSrn6FG4miBAL2HhmuQ8WALb4tcBjyVknOWsvIUMRrzIAqAEfkKyQsihDzLdEG2YwDpDsblvuOA7gUtoZmorrj+eYkAkllCVdXTs5ZDfO6DtKz0Q0EmPGeirEONqULjcx6bV+RTREnG1FlzWe8UD1cPsDNSxAeBHoYV5PLxzGyrDYjd3fvfigHVDsDNdwhiPWMnLto3wCCV5EsqlWd5yP5jTimc7z5JCdl3CKo8WrvuPe3vQHXQqDo8e+6TXaaRv/K5uOK9oMxaL1Q3tSjlgHmKM3cR3ZZy2CUNgCHhJ9uhJg4DTAQE/ZGCKQ4w+Uu/45IPZOjOhws5As7C7CGelyuvz7J2RnRbJb7Jj8gK0mabev2hm39TzTa86xXtPzv1AslrWbvDMEuek7fv4KdD6PETe8vruLSkD0DSDGjK5jdBSZikmSZxRIjsIAz1AA2Ca9HpPjM5c6kiwSXDyFZKTZHOLZTC54R2+C5nw/8ilpPfjguqzq++fFxzZPzlrjwauDmKnXc2GRE8rkTBoDoKq/+8X+PkBPp4ieXi30TKmTsnPQABp+HWiEkC1w9KqoKhn7nBi04/cGxau8TTOmA0xCjx/kTxn7xUpmdK2XZVJeWb6lqNTIOMcfFkA+cGuh3MBpAOSBAbJEAthPOOZxfXgreHs5W5qplAliWaLzWXe5vPZn0c1mNv29CMumt2+OKec0TO8np/DegbyMyp5cwgL6ZTFoht2xAu+fFm6+01DaNDRCZRTxgEZyUY8MoRBGFhBXsf9CkRE54kb5kTjnn5sJbKWP3CzczsW875ve11+mzuW66zXAdce+tqKnlL91Sd8ceKi3TuIdxyQu4YhFaqWNarwm76UlftASiVeMvCGNd8xqzzfRI6CraBYrdX9EBG/E+w+Jp5wumonXbrfbgOYPLqv5leBom+ibJasGRb8lKfvuSxsYVFb4Yyl3SYU3K1oPMJrWru3FD/PbzN8H1xf3kvLe/4WaN2xK3M162zNmMBCm5+l3hIkS+Be4kqO+4w29gzy+Egpt0/RaCmVVNb2tSfu9ibxZj/tCBEiMRnjarNJL6t5uGn8DSu/dmtIXlPVknGw2SuJHwhFQDnhFH/hDfmp96l4FgrbJvFlxa1Dm25a69z3/DlQdmDW5F1mA/5W4X1HOhzcm58Cs4L2tdLF9DGX55TfhhwZE/NK5ehXHt0zEU83+latXytXvRNXNoturJaPUg2GimcmrZG+zSn/T5ffrC31ZdF5P6M1C3phR+k62kczak75vHDJdiv9djJbrvYvieyUw2ib+ZsXtSa48ttK/m0xgiBhU2kBSWonmdIeP989KbvUVTnSHyZE1ZRBPjfICnbV20Eh0iSgL5Ve8/ShvId//XEUwnVXciJpYnTpBlZYEbhEzo8tLjk8R46ZtPYNjyktBJpKJqGobVWt5QjkeyD2jHOP5JGTLDMt+PWHZGTaxtevknXZH7LncabmJ1Tm4lKNQtNuxN6gHhV4jKNSyw+4nnL4bkGRl/fDu8qP3QYKSSsuOMMDI6cyMrleQ0NW0cdnPzd7IvuWCXXMGcClWYiRexuimELp/gCpUzg5K2jXR8e8NHtHc/7uS6p79b6b/AA=='),
			this.addDataEntry(dt + 'two line grid list', 358, 642, 'Two-line grid list',
				'7Vtrc6I8FP41fmyHBAT9qGj3MtvdTtuZ9+M7qFEyC8QJ2Vb312+4BIUEGxVaS4vTSw45EM6T85zkcOyZbrj5Qr21f0sWKOiZ057pUkJY9l+4cVEQ9KCBFz1z0oPQ4D89eFNzFqRnjbVHUcR0FGCm8OQFf1AmyQQx2wa5YOHFPkq6Gz1zHPveOpFTNOfXHy9xELgkIDTtai7TI+nGKPmNxJmIRFxnnN8KUYY2tcNNRflYvyASIka3vMszXjA/62H2B5maj/DKz9VsKx+4F2eCVaG7e3r+T24AtTFMyRiAj2VkGkfZxAvwKkqa2eiqNgJDx57AOhstScSUBl17cxyt7vMntnaiR7LmApDrPuRjNEQb/02awORtimLe+i+3ZKLx7GOGHvh1kj7PfBJymc/CID+tBRg8DTBoZTKKAo/hJ1S6/jkgWifO6HCzSrzwehUugmtG1v/PPHrWTDbVhikrbHMnve5n7T2zWbZsNXCs1fL73xHMh1Xc/GoIS7e/cspXIMtljJhk9eIptIDon0ctavco+xIEQ/tGPbXbnLsAGOfBsC37QKNmtyWzPyCPzn0uu0NkzU2fhATbCxNnz34npwJOAvEJnhJ6dIWj+wyzBLrbVMC72ZogFhxX4b5x+lHwWIUL+0Zr3NY/MRgdOz10uc1pgtvibDpUweEWt9OjglAOWtZZGBjqWtBWW/AA7QGVww0aoT1YYb1hC+43aAKiJ4LnSBuhfXmzMGnHKgAUEf5MkhSxyjHKqAnybRS2YTOexRgnpliT+ArQXgUi1WqiGbe6Mst3b8WvBOr7ce1uOuV/jcm30Q8JLW7K/cX4nNsRUTnI3KSHYvGcoIHnXjDKLxDixSJAlWhkvXbk2ZYUSg44lPG1zsRX4Cmu0yygQAL0fupOfz4+fBAsN8JXTX6UHKgT8MqZBffXz8eR+/Hw5STvdA9fOVlyS2Y42V5U0D2cMhpPkk9dxOS6C/KcwyzmR4CWTIH6jDBGwt3+QETqrPUjVZoAeyca5wqTwYG5Jk+ZTPJVAPV6eRTgqJbGpt3ILAFmv41ZImdjOFxc4JIoIjTe34tyqw8d0yzsJROEyswvJMz2YdemiT3oTkwsgJrkTz0BqLA9dwVdEEAbeQYg53c+CaAFAijCiGLX5SiixoUTgpyeGs1mKHlQ16c4ZiiKUXTxtKBHAkcv4lV4XjYJyBmpTxJogQSKfT13S0sveFw4D8h5slsvfdTvxI9i0hUKcLq/DpBTZ58U8ArrgJco4d0tDaCc4RtTzJjHZV9JwDrCCMPOLwqgnNlrjwve2i0LN7SgPehCZBZgfQj0akm1Bs33R6pymu6N0WzE2WzLgHrO5jTDlC2ho1Gs9H7QqXWmGrQUznTZaGlUNAm0uCZex6gOmLo6phbML68o+opXwf0zSUy8Chb1D8XLerE9aBYJOYskIaFRukQoqi/ErClS0kPo8CshWK5oAIpIo4BIPOM5BUQnVxAdUZRnpMfpufPD3C9PZ2UJ1kW/O2umSGjmzX9LkJTq6WpwObFGCNbkMgregVXeV2SsLRmqpmpay+9YWylp1SkTeikCvCVCnQfIlHMItQApKe0t0XG6Bg9v7r7JknXf/6LLPw==')
   		];
		  
		this.addPalette('gmdlGrid Lists', 'GMDL / Grid Lists', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLIconsPalette = function(expand)
	{
		var s2 = "html=1;dashed=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library icon ';
		var sb = this;
		
		var fns = [
			this.createVertexTemplateEntry(s2 + 'edit;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Edit', null, null, this.getTagsForStencil(gn, 'edit', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'star;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Star', null, null, this.getTagsForStencil(gn, 'star', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'heart;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 18, '', 'Heart', null, null, this.getTagsForStencil(gn, 'heart', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'reply;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 18, '', 'Reply', null, null, this.getTagsForStencil(gn, 'reply', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'users;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					24, 16, '', 'Users', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'gps;strokeColor=#737373;fillColor=#737373;shadow=0;strokeWidth=2;sketch=0;',
					20, 20, '', 'GPS', null, null, this.getTagsForStencil(gn, 'gps', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'share2;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Share', null, null, this.getTagsForStencil(gn, 'share', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'navigate;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Navigate', null, null, this.getTagsForStencil(gn, 'navigate', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'chat;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Chat', null, null, this.getTagsForStencil(gn, 'chat', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'voice;strokeColor=#737373;fillColor=#737373;shadow=0;strokeWidth=2;sketch=0;',
					12, 20, '', 'Voice', null, null, this.getTagsForStencil(gn, 'voice', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'google;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					16, 24, '', 'Google', null, null, this.getTagsForStencil(gn, 'google', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'video;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					24, 16, '', 'Video', null, null, this.getTagsForStencil(gn, 'video', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'gallery;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					24, 22, '', 'Gallery', null, null, this.getTagsForStencil(gn, 'gallery', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'birthday;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					24, 22, '', 'Birthday', null, null, this.getTagsForStencil(gn, 'birthday', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cloud;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					24, 16, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'x;strokeColor=#737373;fillColor=#737373;shadow=0;strokeWidth=2;sketch=0;',
					16, 16, '', 'X', null, null, this.getTagsForStencil(gn, 'x', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'bookmark;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					12, 20, '', 'Bookmark', null, null, this.getTagsForStencil(gn, 'bookmark', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'calendar;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Calendar', null, null, this.getTagsForStencil(gn, 'calendar', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'attractions;strokeColor=#ffffff;fillColor=#737373;shadow=0;strokeWidth=1;sketch=0;',
					22, 18, '', 'Attraction', null, null, this.getTagsForStencil(gn, 'attraction', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'dining;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					18, 20, '', 'Dining', null, null, this.getTagsForStencil(gn, 'dining', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'education;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Education', null, null, this.getTagsForStencil(gn, 'education', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'family;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Family', null, null, this.getTagsForStencil(gn, 'family', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'health;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 18, '', 'Health', null, null, this.getTagsForStencil(gn, 'health', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'office;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Office', null, null, this.getTagsForStencil(gn, 'office', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'promotions;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Promotion', null, null, this.getTagsForStencil(gn, 'promotion', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'radio;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Radio', null, null, this.getTagsForStencil(gn, 'radio', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'recipes;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Recipe', null, null, this.getTagsForStencil(gn, 'recipe', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sports;strokeColor=none;fillColor=#737373;shadow=0;sketch=0;',
					20, 20, '', 'Sports', null, null, this.getTagsForStencil(gn, 'sports', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'travel;strokeColor=none;fillColor=#737373;shadow=0;direction=south;sketch=0;',
					20, 20, '', 'Travel', null, null, this.getTagsForStencil(gn, 'travel', dt).join(' '))
   		];
		  
		this.addPalette('gmdlIcons', 'GMDL / Icons', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLListsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library list ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'scannable list', 358, 642, 'Scannable list',
				'7Vtdk9oqGP41Xq6TgJ+XVbu9OZ3pdHfmXJ5BgwnHJKSAde2v7wtJ1g/immiyurrpbBUChLzP+8LDI7TwOHr5JkgSfOceDVv4awuPBecq/Ra9jGkYtpDDvBaetBBy4K+FHg/cdc1dJyGCxqpMBZRW+E3CJU1z0gyp1mGW4REZUF3caeGRDEii8wWdQfujOQvDMQ+5MEXx3Fy6mBJ8QfM7MY+hzih7FBWKvhzsrsnK+vqN8ogqsYYiK+apIC2Bu4O0WkCZH2TVep2s40SmGf5r3c3bw5fMAMXGwJYxXOjLF+xUsgkJmR/rZNq7fRs5Tn/YGx2y0ZzHaqvwo7l04YTMWOz/zN64s8l65glkuFndp6yPTp5mf3TSxZAWVELq38ySusYqYIo+QTu6zAqcEPICFYXZ7VKAodMAQ500T9CQKPab7rR/DoidEz06evF1FLb9yAvbiif/TYmw0UMTPBz0zvJwXGyw3QrrLHjb3TS9Zc5Oz7amW9Wa2fN/cAbden34wxDtPP6hv9sCn88lVRYar29RCqCuBdAjBTR054lHRaVYK46h/YAb9gaDQv/fihDkHI++NNQedCxpjNmMhF+yYI+Y5+kOv0Z/SOdqU/Mfk5r00WWDrts/z03Wu7Fbq1v06ojbRNA5BTPNqCztHR2ER2Xt3i22+xvRmttqJ1p7tURr3kwerIMGUOnXgQqAArEXWIhsm/8QLGmNPGjRmUCVHmTdokG2Htgeet3mcRvUgRt0Q8Hg9a6hVBqhbnMA5THbJEDD4wCdxLXhDjVXCqrHVxnCV8X+XAfXMhMN3AagcR0LmwlZpwQlSSi8vdeG1HNA4X9Fo4RKZZBjphlBfENnVgxMgJxl7LGIxcwE2z7EYFp1AIk9LuKYq4B5KE1K9mnHNvXvbmiITvY2yRFXikf5CLDDcfTCp8BlSvnE8KhPoE7BrNhzKrpE2RWB61p4jrmIDUhTSue6+4LLGVuCOSDhCw6gtdvtKnDtEr1tK+drtu28VvEK7RDmx/HqvjtcqCpcxRHcaWJwdW1ZQwe1A3H4rpgiG9Ohuc7AtOoIfVl4+6gJeG2h5gR2ExHhs/hnOrnqOfa7ychx2+Rk+Kdj4t4sPJrof2fpAQcAetkDZ5uc5v5dOKWeNVSWUE8+aclRr3cHTayQXVs5AQ4iNAtZpR8SmtMfwAUkfHI9tRH4A7oQ6a+6izHnlQbBj8tDUme+JiJiaxzPgVlgAY/UzIPG//P1h2cdVYP1VJyumoHYwomru2/Lm7fOPy6MbjMEpBZ55VoIyCGELsNAPoWROtweDZr46QbZysjjMtazl+CJJgN6DpMzQEfeCcW4Nq0D2VpHqlPF5uHQM6LZxoxH8Brm0aHu768lo0qLWk8pgzTMUZmKkrBQbigm8QmLP74yUnkWu+wyOt+CUG80F6gkd8pRblAkKdjN8pE5yjWpJGX2mHxylOOD2rCRUc1WSX5wsYCckGv5Fya0pSS+mdoCEi8AMASNOgtGwymRWi6ZkpnWSPIfBwSb3gmdQdemmBTsCpmIZSTBjhpRtRQLujZI8mVoNg858tcS3ugWfr2pHM43qKMUbEBB98lRLoxuMxzlpnSUQwhdhqPcu47i1jOoDfewqMXvsa2jjAMqzJtNQy4lj/SS29AVSMO4ch/049rUFGyrKU+J0PaAMtL0IhVFYs8oJPqraWAR89VdUpAblEmwLZPgO6UgNyiT4JuSSa5qMwk+9ShOpcMd2Qh36pRTbK/1ToVjZCNf+Zzp3w+NrKCwrYec4OBTAgvuAir4ShIP4XLi/n38Npd22mh3E33hHv6ioxc1HZTq7zy9kXNSuMSJmBwrqMkSSa8KodsHqMThmDeHtEui0781eCC5OTadFt8+Vf0X'),
			this.addDataEntry(dt + 'item list', 358, 642, 'Item list',
				'7Vtrb9o8GP01fKRK7Nz4CHQXTdtUrZPej69ceCBRTYwcr4X9+tm50KQ2bQBnQYNUlYhjO845Po/NycMAT1ebT5ys429sDnSAPwzwlDMmik+rzRQoHSAnmQ/w7QAhR/4P0Mc9V938qrMmHFLRpgEqGjwR+guKkqIgE1taFsxJFoOq7gzwJIvJWpVzmMn+J4uE0imjjOdV8SI/VDXB2SNUV1KWyjaT8lbABWz2DjcvKsf6CdgKBN/KKtvi6tC78b3QC7HvRFHgBZ4LQxcXvTwncxEX1bAfFWUxJMu47DnwymcjWVGw3HX/ApD8UGJkxgtreLlyuGPsHAQbockyVafF6F7DiG7xKAr2wbhgqahV/pgfqvKazJJ0+aN8Yu+l6CdbywK3bHtfjtGpzpPf6lTCiCccMnn2X4mkavEcJwLuZT+qzrOcp7IsFitaXm7FKTJz+h5hyCvKOFAikido9H8Kid6Rk361WSqh3ixXc3oj2Pr/B8IPZa8VYNgMWLNBKQnnxtfmvxfoaLqHolne/44lcli7mw9HqHH7YdjsgS0WGQiNjd1TtCLIPy0qmWXTZAmPvHAUGqd8l3PaD09jYduUhlXUAxuyWHNYgIRpBllLJnaLRivc/TfXB5MYKqwaYgisiKHqptJC1AEroQ1WMiB8FmuE1NGvs1ISVVSupIFOpKh19HJN0csOYcPA756xyA5jQsil+6+KqDVDfncEVWrtkqCRRtAXkqpenTvgj0manb7a6KtKfavl6ds4Jz9kuaIumRE6LveIq2Q+V8PYbRopLMTL3u5rfnYbon73ar5vZV2L3A7odh0rghT5Zq+NGG/l7iL40Bbx0eErGtYJqHq2vKK5nRDi2iDkVwZtCYkc9XciIa2jIzasX9hSePSdV/x0ER9d3RX4RnIMvrA4zVh6jY89xUe3mkd2+dZdjXPSo7sH8wsSpO5Y3IGQcCNnSjjNrpLsUZKjTpbIYy2QvyRJ7+IlqbslPzk8MaXJzyTN4KrIvhS5sz/tEm7FiOlOkcHFK7KF71JxQpOawVXDHPJDs75c6z7xpiICOdW3ofoXvMhARmRFHNjpRBy6pTImXO1KnAmkKQhxjYY9RUNccWOVcKR7KmONYgmKaNKEDDTt3JK9NL1+a1nRNpMQ5+G0XYQ8wmgxvDo4+K1kS6MFdcHSeRst+xi5nDWr4qMuo4cHUCBMY55kAq47yT5jZ9jFe1ZDEsk5qfKdLcslqFK3W+T0V5pkacr49fVQX3r0UCd7mfP2WtDFey2GzJQxlYgh5zvQq/fZox6jTtbH83Za0MU7LYYMl3EqYpYqGO4FPME1haI3Tfq4kzVSN3jOSpPRpWsSH5vkckDO7E5gdr3QbaPBezLx7PigQ68TFqwYLg9k9mhyp425mnVejkzYLObOWyZ1M2vSmLRpyrK1lHIeNvXTRcY51o0YjbiKK9kyWWdwVgz9+wS1ME3eDGl9shP+a/TI05ffqBXV6z9h+wM='),
			this.addDataEntry(dt + 'item list', 358, 642, 'Item list',
				'7VvbbqM6FP2aPLYyNrc8pulcNDpzVE1HmscRTXYCKsERuG1yvv7YgFOoScdJ7BJNoGpVGxvMWqxts2yPyHS1+ZJH6/g7nUM6Ip9GZJpTyqr/VpsppOkIo2Q+IrcjjBH/HeHPe8465Vm0jnLImE4FXFV4jtInqHKqjIJt0zpjHhUxiOJoRG6KOFqL/Bxm/Po3iyRNpzSleVmULMpDFGM5fQR5JqMZr3NT3wpyBpu9zS2z6rZ+AboClm95kZdkzuKqBPHCqloMyTKuq/lu3fCoqDKWu7qvT8//qQHoBoMoYDi8LROCDsIkSpNlJpJV695ihG/JOPT3YbSgGWsU/lweovA6miXZ8kf9xO5r1k+65hlOXfe+biOS6eQ/kXQIT+dQ8NSvGklR4yVOGNzz64gyL/wl5HkxW6X1aS3C8HGEYbfKyyGNWPIMreufQqJ75Bu92iyFCq+Xq3l6zej690OUH8qeFmCkG7B2hW0t3muvSjfgdH0VTedQNOv739GEN2t386sxbt3+KmhfgS4WBTCFjd1TaBHknRZyumXTZomM3WAcdL7yNt9pLziNhW1bGkZR903IYp3DAjhMMyg0mdj1CFq4e924vyMGiVVLDL4RMcjLSC2EFlgJTLBSQJTPYoWQJvpNVmqiqsJSGvhEirSjl9MVvcwQduV79hkLzTDGGO+6P1RE2gx59giSarVJ0Fgh6FuUiauiO8gfk6w4vbdRe5XmUMtVh3GoPHi+oC6ZRemkHiOukvlcNGM3aExhwV7Hdv+UqdsA9ztW8zwj/VroWKDbQUYEycrBno4Yb/nowv+ki/j48B6NqATIKxvu0RwrhDgmCHkqQJeQEImfEwnRjo6ko/8ihsKjh97wYyM+Ouon//eoxOAbjbOCZkN87Ck+OvI9Msu36mqckx6dPZhfkCBVx+IOGIcbo2mUp8UgyR4lObbSRR5rgXyQJN2Ll6TqlvzM4ZkKTX6NsgIGRfalyJ39aZZwI0aMPUX6F69IDd9FcpImDYOrgTmUh2J9OcZ94o0kAiP5NdT8wAs7yAiNiIMgK+JQLZVJlItRCbqBLAPGhmjYUzQkkhujhGPVU5koFHNQWJsm3EHTzi3ZS9PbWUtJ24xDXIZTvQh5hNHSMXVw8KykptGCbbB03kbLPkYup8+SfDRl9PAAAoRpnCcFg2Ek2WfsDGzMs3YsIjknVf5hyHIJqlTtFv76C03SLKP5MD3Ulx5dbGUsc95eC754r6VjZcok5Yhh9C+kg/fZox5DK/3jeTst+OKdlo4VLpOMxTQTMNwzeIZhCUVvmvSIlT5SNXjOSpPhpWuSaCxyeVd1Tfdz75r9OJrTFwNaaFdorf3rWgiOTvQ+JRNOELaokKCZZUI1XX7AgkezWCGkNsj2xqs6QElJtcKV47+JiF5nzDQR0CqY3o1onbx5+EDatHdhqLbJV0jXI+FK+tFKPGP1l+csAOYP0exxAP+47gTbkIjqgNzL9a4DTcfQ5CAbI3GiGiH3An6M6JM6ozMwpcWUZ2MCjnzAlpnd+NrsVOi2VeFPo2TXzDTolWtlEGZkC03ZW+lu1WjycuR+DfL+dgB0jdubJjr3bHRtsjG04yxo3d3KhjOiYTlIrnjNZF3AWTH09xN0wOKOfZ83vbET/G308OTr/vOqeHN7+v8='),
			this.addDataEntry(dt + 'item list', 152, 631, 'Item list',
				'7ZlLj9sgEMc/jY+VjLHzOG6y7bZSW1XNoWc2Hseo2ESYzaOfvoPN5lGyqyxZTsVRJBgYHv8ficfjhM6b3YNi6/qbLEEk9GNC50pKPZSa3RyESLKUlwm9T7IsxW+SfXqhlfSt6ZopaPU1DtngsGHiCQbLYOj0XlhDV7O1KSpY4pCzTiv5G+ZSSNW3U+gvbKm4ECf2qr+MR81KuUUjwYqdD5SG3Ytr7k12wQ8gG9Bqj122vNS17VHYhdbAV7V1G1E7FusGw+rge5QAC1aFy4pQR5Gf8lFq6eiCGzB6mK3wJRN3gq9abGl4WZous27NlrxdoSk91r5CZRZLRkYv2eoF/2OGIwXWFXRY+2U3acTa1lzDAj1Nny0eErTVuhFv0TLz07IoBpsCwTTfwNn4t+ibX3/iBG/h1RPnKhZSEpK+URI7xQ/JceYs3Vtl03MPWVUdaEfCw8KuUrVwVL1TnIn/7NDmk/chVAQgNHIIzZngj4pHRj6MSEoDQBpfgNQgIxYheUEqSABIExeSbPjS8GFtF0l5kZpOA5CaXiDVdlKwSMmLUpaPA1B6jmvOMKmOb+K/nh+laYj4gZALlJ4UB4XG77CNrHxY0TxEGEHcx+p7JbE1SxfxFuWLahoimCDu8/4BFSheRVY+rHIaIpwgbu4AB1CrGJ57UpoECSfcXMRnEBswIPpbFVojLp+0BA0SV7iJiS8NyqQjJC9IkyABhZuYcPC8mqdvZZ9K/SdFP+s/Nwp77nAic35B5BtTqHauD8/BsBV9/A4/DKweX7sM3U/fyvwF'),
			this.addDataEntry(dt + 'list style', 358, 642, 'List Style',
				'7Vtbb6M4GP01eUyFbS7JYy7NSKsdaTTd0T6uaHACGogRuNN0fv3aXBKIzSVgJ52qqSoVxzbwne+c7wKdoFV0/JK4sf+VeDicoMcJWiWE0Pyv6LjCYTiBRuBN0HoCocF+J3DT8C3IvjViN8EH2mcBzBf8csMXnI/kAyl9C4sBz019zKcbE7RMfTfm4wnesv2XuyAMVyQkSTYV7bIPn0YT8hOX3xzIga1ZFqfCCcXHxsvNhopr/YJJhGnyxqa8FZf7AB3kINuxTBNBBA0bTwHKd3kNPOrn05A1y8d8HOz9YmfbLO7NTfOB/Wn7s4HYH4WN5PZCgr0Au9wFMq4ymxsG+wM/zK/u0ozG3EGLxyYz7siBViZvsg+fHLvb4LD/XtyxeR76h8RsABRrn4prNMrj4Dc/ZGZEywSn7OjfwpJ8xasfUPzE9uFzXpmfsjGfRmHxdS9MoRzTLsCgmY8lOHRp8AvX9h8DojnQ6aPjnhP1YR954QMl8X/PbnIter0MhuQGqy8oKGE8WIL/m7ZoTXCtNYvzfyMBu6zTyadzWDv91KnvQHa7FFMBjdNd9ALIGqdKctpcojRbrxZSl9fp0wDa42AohdDUYHZbBS/iBO8ws9MWp32hmJmWbfQ1vNVp+NI2NbuPNPuxvk2JgqEBBUdA4Su/wU0QMote4sEsRes6zq+9K0bkAWHKFZ9bO9i64aIISVHgeXxzCS/KqBXiHT3v9Xd2tHagomDRja+aYCHnla0D0ZkKXqXYTba+QKkqf6q8KqiWTy5RhCNBqC+oQAJkAUcN5aYO0s+5uQqEePS5qeY1wyGLPIrgQKZ+OIAh4LEhoYcTUQBH5wHZh40TLmeU3xU0+sjfpXBSrql1gbUlGfaFMtvZ5yIzB9Lza9LbgYmMZSnRW2Bp8R/QzefSV9jKIE5xT3cBizXsL6PdtjUN0bTl2NhcZVYjKkBaLD20gVDPGcMXUTirKjkwjIGGbkKx4lQ6tZRSQJZMKiqlnNrZtVRSQGxYfPMJJfcU0qokOqIknjaSK2x3FlpPcu/cxLDV6CQ0LB3eIXZC/nIPbIDlQ2yxAY1yRmvJAUwRxbnFf9oKjAKmJaGURHwXATt4xzIENPRguvBGI8W7xFsL3D36KsPC4gltVba9XVyc6zC0kk7KLkt5RWOvNqvH1eO4Lnt7RdEnMEq7LDM1gbHMKsrICLSkLmKjZQBIwWFHWvggpDQn8C4Lg1HMuUthflEJlqFCLUhi72SVYJfiRuEqUpY6cj0k7PTsqgqMPSSwtQaoLFa+q8cs5kjSlhHL0UJSsTOzJtuXiN+06gz25AHtKavEJxpT1n4+ce9aXpEHoJKsSj0Air2gATLtka0IuAln1saUqfS5YT6w8JzLkWgrNGU9OzXx9OKpxVRHygPFlstTzJTaY8jgT66+O67atg4nUNINSit+I7YZNvM1s4sGzna8evIROSs2h/I2+ydd3xldTS3JtZoXYZrK1OWa/2hhakMV1Fatwj+bqVd0bsKg8uS3YvXn7CNYHfRp2eqkiCKG2Dra55JXYn7EIXE9futFH91gBmYzAg9r6Kp/CudIt5jpqEol7+gMEM6X3JNuKZz29cKpr80HLp5/aRFOsX/0I8VsYOVGOHE/+frO+GpBLT0EJe/3bHOXuSVfZ2r46vwxfEVDuz1DnlSrzXPeagtuxJepqYMvqMf7M918eXa3P2WsOHfaG3AZyJbcd1oeasEP/7oH6tGA6XrCe0+EPj5AYsulESCppN0THeejwcMOz/9ql0+v/ife/w=='),
			this.addDataEntry(dt + 'avatar text icon', 358, 642, 'Avatar with text and icon',
				'7Vxtj9o4EP41fGQVx3mBjwsLle6uUtWerh9PKRgSbYhRcLtwv/7sxN4l2AE3sYEAQSutHdtx5vHMPB7G9OB4tf2UR+v4M56jtAcnPTjOMSblf6vtGKVpz3WSeQ++9FzXoX89d1pzFxR3nXWUo4zodHDLDr+i9Ccqa8qKDdmlvGIebWLEmjs9ONrE0ZrV52hGxx8tkjQd4xTnRVO4KC7WjOT4FYk7Gc5onxF/FMoJ2tZOt6jic/2E8AqRfEebvCVzEpctoD8ou8UoWca8W+DxiUebsmL53vfj7ek/XABqYUBJGIDO5Rk6vyWTKE2WGSuWszuUkeMOBi+gTkYLnJG9xtPiYo3X0SzJll/5G3sfVX/jNa0AvO83PkdHlJP/WBFAWs7Rhpa+c0myHm9xQtA3Og5r80YXIa2LySrlt7UAc5sB5nplXY7SiCS/UGX8NiB6DVf0artkWvi0XM3TJ4LX//6IcgV6wxA+T1qtcKgWWLXDjivvk1+W98TpBbI0we9Kkz//C07otN4f3h+6lcf3w+oIeLHYICKh8f4WWgD57UyOWm0OUILPw6mnXPI21zRwg3Yw7Kq6YVTsgQm9WOdogaicZmijC8XA8wNHV/D+ScEL2VTk3lLs2+owAgXHAgqhhMJn9oLTJKUSPcSDSopU7Tib+ykfUTqEPrP4TNrJLEqfuUtaJfM5G1yhF8JrpWhBPsb6qyi9hK4hZ3EaXzPOQq1XgQ1EByb0aoOifBZLKrWvP/t6xVWtbCxQdFuCUO2wBwlQORwzKtcPoX2dG5pAiHmfs9q8ejhUnscQHNCzDwdwJDymOJ2jXDaArXgArzpp6g6NJGH2s2pMAwWbPrDCQXEdsHCgfL4l29qQtPi+EdsKfCtrBZzWXbEuaM9kvUGaOgoG3Gsakq3nyKIVdW15yaCilABakXTTSECVH6Y/ZSPJLOIoDMKgucsCNWEB3uN9m3Rk2wRUxNHQtimsPN3KrgnIwYkvMSb4XEZz3/yFsvlziqvWmp5ml1XyeuHgRGDGJrqOb2MlyBGOP6KMVlCeQzs7riNaHN1KAE9Gceizz7GNA4dphAnBKzaKhJ17we0FqImtnMIbtjTUAm8rcGvES5q5wJHLPgZlez4fOLQhaCMRkkVBZe2Exo/vFHScoDJ6MjDjBAWDEF4QWKEpcgClAUhJtsBH9EGiL+PpeDKeKDYBrTTnIhvugx2ecBVmQZJjIl/RLFkrQlwPsnI1ZCW0oq9y8KUkK0yR752tDG6PrbhycOcybOW0bLvNVlyNyMhF2Uq5Eu6brQhMOsVWajTnZtmKIu3jO85fH1TlaqkKhFZcV11chX3Fd+dUpS5ppdNU5UoCKxqy7ThVufbAyomvYO+DqnQwsKKXSndLVEUj2UTgkiaZbK+oyCcB+7R09LyDCBnshElyZMUYqNIVnHrx6uZ5KtI61FlUjySCziQReFZMG5RjEv9EMzpPzNhdQqii5BFffA/Cb3RdGCL8XmCDAEI5hMIJv3P3hB/WRG+6TPihRjSmGeF3wTCYatMWDdl2m/BDOaKiZ1wrXHKOZ9psfx+DhilG8DjV0UoxUlEdQ5uAYeXpfSuwGTk6c94tQJ0u3ewWAMpRiz8TMotRVrzAqjhE+GAy18pkfCvJm1COsPBvWR9MBjY8c3LVTEYjWNOMyUyH4wl4MSjbjjMZM6d7YoTsnJYuF8JdkxYjp3vOTFqu6QTWOUiLp5EV0vrMr6AbZs/87uowUToNr6XiCE0R45hFwUjKyI9o9qpSiXdrVodLw32ZdyqPxNWwcd0++yF+26KNu78kQrcPkEbA46hJuyQ64a3BQ4sfP6BTNt//fZ3/AQ=='),
			this.addDataEntry(dt + 'three line list', 358, 642, 'Three-line list',
				'7Vttc6o4FP41zn7S4R36Ue3b3dmdvXvbmftxJ0oUpkC8IVbdX785CViQUFFBbbd0KhASCOfJeZ6TY+yZ43j9QNEi+JP4OOqZdz1zTAlh8ihej3EU9Qwt9Hvmbc8wNP7fM+5rruriqrZAFCesSQNDNnhF0RLLElmQsk2UFfgoDTBU13rmKA3QAsopnvL7j2ZhFI1JRKioas7EBtUYJS84v5KQhLcZZY/ClOF1bXdFUdbXB0xizOiGV1mFPgtkDdP2ZLMAh/Mga+ZYWcdRKgvm27Zvb88PMgOojWFWjKHzvgxN7TCbkIQ9hf9CiW7ycxSF8wQuy97u2kzTbtyhW2czuFmh8r3YoPICTcNk/iOzgPVW9EwW8OS8I1mfoZ8Up7xbPzNLQo1VEDL8xNtBlRUfhLwsYHGUXW4EmHEcYIYlyyiOEAtfcen+p4BoHTmi4/UcvHAwj/1owMjinwmiJ41kU22YcoNN5qQDW54XzGY5Vavph1ote/53EvJubR/evzFKj++75TuQ2SzFrGL17Vs0AsKuAPEtmZD1Qb6k9oldBxoNbw3l+C64oqHt9ybpOv2i00Z4xt4q/CHObl3jsr5ju6eNgk3ZBVtF3WnD/RYUzzA30xSnKrxtz7GamthWm/gdv8vNUvI7pxW/y2+Tu53XAQBuGwCkGNFpUHHAovWLqGSOKSvnDmicCFFjotRVRNkOYH3T6B4xr4LYiC4Tbn5DY0GYwsti/IITXv2+giU37G7Q4VT5CxAIpygaZsUMmK5Me7arpFAF8ykq7Y4SLLbLsqRunjgGMsw9vQPMb9rw0mWKa0OUHdL0NPhranFvr8UtrWrwvKxdknS6UCldU9jfiXJP4lemW9s5v5YwGxsJ8oOtWFQALC+EG/RT4YtDXkG3FutiC2cOe+6I/NqYJAmhaf5o3mv5dFmHV+jz/2+/ia5PMPQ/AcOQJeW7BEw/ITQgxOenPrfinO8xpSjx0wp5DPjhLZHNoRSJ1xwMBk0oxVRwSBz6foSbB0c7wZcjtjId7MxqdEvJNi0NYfU8sh3OcLUuBq1eGbTPxEebOgDLuAhZyIoydS7xv7cDufUOZFc1kzyVdrqkeb2aX3laxjEG/x2N/u5BdmY/7dyIrUoiVi1xtB8k7IygbKqk9t9sxNnqoXJYsNDlyPHacXZD72L6rFezUdcUIuj7bX6+GCG3VbsAqDJJ54wRGKj1MOIgGLyz2tOUMCYPf8dJEs6ARd4LHH6GKcwhvomeLiNf7GMsbzFZMhFbxPyTiGMyg5iBrBJV6HBciCAZROXWu0rvNAsQGs1PShTVeBbaYEB3GTGYnUQM1RzcX0sIPMXnl0icUSRMrROOaiXd1p1I1KR2PpFIqNJt5xSJJz7ZowiEwkfxnplkYfoXoFeYT35HVBA9xVwZYk713N4kSUWiSXuUdWQD/CqC1gnGScM01IcXhP2D9+MJgiLXGFIWiFmkNg9n7EsWzisL3k0XMF93elG/pvxiJ7JgXDq/+EzxK6GCxJOUU/a7upARPUo24hUwAklAEzktWAWIiYkBEAQYRnvEoQ9B5Ew8IJC6kLPI/0QbLpte7EQbjGp68Qeehguco58vxPhSh3Opg+XaXQBdTUpekzo0WAL20dVBldo7pzqMaMgYTBoeScT2JJHA/dMgyx9hqQWQHRK3f6CIYbjw9GuJINsEqaUxoYmQE18wR8zhiCIgkGc0JSAtJ3zp9JFE4ui1jNcsEtWk6EOIEgawzhEkF78E4owCYTtdfGulWLp3VQJhfXqBaJDWy23OW4aLFDe09N3d/b2lS8h8suqd/vWscplWdlZAxFYs0rJbWqTleqWH9/VuqK+VlXWLaJmqmMi5dW39bnvl4EV0csjUwrNdN3ehdXQ7CHWxjE6xjq4ZPgetNRYh2NGrUmp8qNZr1AsevFa0o291gkIrqacJmr6ovGT7A5M6XI71npr5/NZ7jAbuo1o33NJ6fbfsPl2sNzBVKasDNeeSCH1+gKr5mVqAlJR2SXTczwYPP337lZ6sXvwR338='),
			this.addDataEntry(dt + 'single line item avatar', 358, 642, 'Single-line item with avatar',
				'7Vtdb6M4FP01eUyFMQHymKTbGY1mRtV0pH1cOcEJ1jg4Ardp99evzUcgsZmBxFazDVSVgrHB3HPP8eVyGcHF9vVTinbxNxZhOoJ/jeAiZYwXv7avC0zpyHVINIL3I9d1xP/IfWg5CvKjzg6lOOFdBrjFgBdEn3HRUjRk/I2WDRHKYiy7OyM4z2K0k+0pXonzz9eE0gWjLM27wnW+yW48Zb9wdSRhiRgzLy+FU45fW6ebN5Vz/YTZFvP0TXTZk4jHRQ84CYthMSabuBzme+XEUVY0bA5j67sXP0oD6I0BFWMAMZcZdHrZBFGySeRuMbtTGzlOMPXnbTZas4Q3Oj/km+y8QyuSbH6Ud+zVTT/ZTjSAcuxTOUen2if/yl0AxX6KM7H3d2lJOWIfE46fxHlkn71wQtEW8y0tD3cCzD0PMNcr2lJMEScv+Oj8l4DonenR29eNZOHdZhvRO852/yxRepEnQ71hjge8lSS9mxT7DbN5vmo10Ndq5fUfGRHTOlx8PHWPLj8Ojs/A1usMc8Xqh7voBMREAeI73ouGVYx4L0LpiXLKqqkfhlonb9DABX+mWMGnsSSMBJisEJ2VjN6SKJITPlCc4jWvR37N9+4D932ZNQku85G3Y4Ia9QnfBDl3KV5jYaYVzjp7hxd6Tle7T/R2/w1VK1sdUdU3QtXqNBVTQwuoBCZQyTBKV7ECSNP6TVRKoIrOFV3dCyHqrK1Ap61mABtDzz5ioYLYD7zC+TS08ipsyTURwYkU+vmmCBrwT9UxPIk2wLVFF55jRANDYAG76Z/Z1ncBLJuuCoKq7UIIgGcDA+AoIMyWSyzvaxGnJOM4yXByhgo+Z7g1ajxZlEJH/ol2ipaYPrKMcMKaDw5V+PH15HhbGNIarmjo3FQCv6snTHsvjBUPTXKzZWEsH3QN+wkwsTRKSXY7eoV3P/dniwsR6b4OaogLLowfD+vg9BigqQ18OuQvBjGtxXRqBQQ1bzKjwgau8x3TjA0yeuIDoMUJPrKOGsnK2NPRNkhuR0jVbM0gpO1CekiymAVBTY98Q/ltfWFxMiipStv+qZr/vZIaSdb0UdJlJP8uheR2lFTNzQxK2q6ksFp5zIKgJlkeMRdKKJ7vUUqzQUtV4obXrKXAhpa6ahbourS0BZKb0VK3Q/pl0NJaSwNoAwQ1x/IzxS9MiulnNORJNV7QUsRyHVJqJSzV1M5clZS2QXI7UtohA1NhQknj3WzD5DjftOJpUx2BmZd5XlV9YNauauLkUagjYc/ZqHgZmyl2Ht7GngcgtPEqsEtNyhBj1CAEVtRJzWrMU8I5kjEGox3rxW4owvBvL8IY8ip9eDqBNjLUmuKVJ5REqeTpLEJbda27daJedVbFClFhh6xK5QhiJNllGqRBWFXl6txCDI/Y3gAZteE/UCCZaMoFJ4bKBatn9kOmyw4oRgpZdvRZLbmVFZ6L4CGo0epdzlm4TCs8B5a8U0VneIyQjYJOqCZZuuHTq0ZebsYf31pZo38WMLO8jT0rKBjJYizR6peOJYevo9pwOZc9vxc3587tQB9dBbuhj02CY/rYiEtgj+xGveZcD0IfH6BL60veE53go8EjdutPTIvuzS9Q/wM='),
			this.addDataEntry(dt + 'two line item list', 358, 642, 'Two-line item list',
				'7Vpbb6M4FP41PKbCQIA8Npmd7kizq2o72tU8rQg4YNXBDHbSZH/9+EYImLSkBWWUDVIuvsHhfN+Hj4+x3MV691BGRfYHSSC23N8sd1ESwtS/9W4BMbYcGyWW+8lyHJt/LOfziVYgW+0iKmHO+gxw1IBthDdQ1agKyvZYVyQRzaDoblvunGZRIepLGPPzz1cI4wXBpJRd3ZU8RDdWkmdYteQk52Pm+lKwZHB30lxZpW19gGQNWbnnXV5QwjLVw52GalgGUZrpYb6nDY+oqkgPY+u753+0A7qd4RrOANyWe9c+yycRRmkuisq6to9sO5j581M+WpGcHXX+LA/RuYhilKd/6Tv26qpvpOAVQI990jbaVRn9J4rA5eUSUl76R3tSjHjJEINP/DyizwsnIa/L2Brr5l6AOe8DzPFUXQlxxNAWNs7/ERC9dzJ6vUuFCu/SdYLvGCn+XUblh5jsdjumOWCvRXo3VeUjt3m+6TVwrtf09R8J4mYdLj6ZOY3LT4LmGchqRSEzvH64i15ATA0gniBjnLH0LDl1y6StqZkfhp0UPxKBA94WmFLTRMhFwIviCN9rPa9RkgiDDwLHcMXqkV9l6VPgXFZX0+BjDNk35TkoI/whpFmUcAW5m2JIe7PDCz27r9+n3X5/RaiVrxpC9QcRanWaSqfhCKgEBioPMIdlhA1wuNtYx7zSkpQvD0MYwG+rLGzNWeBXm6M8exAthWAE1EIDtceScOJDcesZYaQPen5H1NCB2i8FijsMKMAbA5WZgcoii/JUgLInm5L/PBCSCpDmwhvnI+b1Q6wlyZk8OuY0JoTYmvuuFvFgDMSBbYY5GXmpAacsYhsz5LmpsRFutIcMgw0wsPneBMVG4muLKFpKHQoR2pC7ai8iCYkh/95QKF3BPXGT6Kg0mI5Cgx5JjirUxEhGkM2wksMD5dHp9jH9Cgbya+CP4VczX/I7n+zIRlw5JwytOI8ZInmvp98tkuyB4yihJDBTJn820ePscYFaQfm4Aq6BqP9jQ6qGCZWQ3vMOwCt2dSOviA/o1pXVs++oyk/F7z3GciZtcUmZwO9KWaH6GhR7eyUZZzB+XpJdkwaG9GsWypaKUU5roanXnjhaQvxIKBLGWnUWsHqsf221n8oqvDoNaCG4jjEzgLAlq2A4ZoOuhNQo61x3nHmgIyNFNnlyMX7rp6UIQdaQ0kisE27kvnZye9U+w7DkNpNrf6MEiniWCpJf7il+xPKttohDj29U/x9QfTYdg+pmxvJLvuWx3SUjFUqqQEV6O4O59GYM0ZajKqw/mHij/ZXTfuqPsZ8GzJRvP9actZEmjsGXufvGgDcXS+Egi6WJN8ZuCTBTvO/Q7jKKn7vEeniB4hQupoh74aK4c3Iz2r6rdmtf2eaqlolj7EcHjauPsh3tmIlaA7gKKz4SFbQzEXQxhK4fIDNbexKgzkfaJdEJrg0eXqzfQlPdj19S+wk='),
			this.addDataEntry(dt + 'three line list icon', 358, 642, 'Three-line list with icon',
				'7Vptb+I4EP41fATljYR+BLqtTtpdVds73ceTSYbEqhNnHVPgfv3ZTkJeHNrQJmK310gt2J6xnXnmGY9tJvY6PtwzlEbfaABkYn+Z2GtGKc+/xYc1EDKxDBxM7NuJZRnib2LdnWk1VauRIgYJ76Ng5QrPiOwgr8krMn4kRUWAsgikuDGxV1mEUlnPwBf9r7aYkDUllClRe6seKcYZfYKyJaGJ0FkVQwHjcDg7XVVVzPUeaAycHYXIHgc8yiXs+SJXiwCHUaHmOsXEUZZXhCfd6u3Fl8IA3cawNWOYYi5L27jIJojgMJHFfHZtG3kr825pnbPRlia8JnynHimcIh8n4Y/ijZ2q6k+aigqz0H0s5miUZfyvLJq2KDPIROnvwpJSYx9hDo+iHymzF04o6iIek6K5F2DW2wCznLyOAUEcP0Oj//eA6LzRo+NDKFk4C+OAzDhN/9kg9i5PtrsN01Q4FiSdzfNyzWyOq1vNvNRqxfgPFItpnQaf3liN4adeswe63WbANauf3qIXEHMNiEfgXHhsdhGdumnS5NTN2vJWRqeL10hgma8TLGfTVNJFwot9RJYFn2McBHLCJ4IT2PJK86sq3XrWdXk1997nIccmPQf1CHcIaqYMtiDM5EPW0ztOq1Ivu8+77f4CUUtbNYjqDkLUspuSp4sRUPGGQCUDxPxIA6Ru/ToqBVC5cElX650Q9Y6sZldkHQawqe2Mj9hCQ+yvDJio8UVwY5ToAVZYk3dkBK1g6KpHC2mm246Pi1a2Yf5q2YVjDBIFF+YI6N1o6K2FKUGNKzjCgQk790HQ7cj5OpD7pYCxhwHGdMZAxjS6UhZRwSMo2KXBZBB4BtkJp+q1REjDvpRBaZopVSRLPkrE/43sJqD7hFAUiIDaA2SnH8gtJt+opyOJ4ZK/rWRnccYlWnuOM870mzmOZ43hOKbmOA8oy/aU9cL4f0xky5yPgYd+rPEDfu4wA/XyJTLGlspVM92J1AVlsk2Vd1lLrE3tSqH/Mjsif90znvC7c9VyxtiEmPopj4ZjmeISXEtTa/CAejpNPKZdzWHsapf9DGtX/eDlHhJgiFxCk89s9CXcRomV+jnNd8rxVkQdjmkichixM5IuI23kkhK4BqLuzx0tG6aZgnQpBEwnPVSNKoMq0a0qy1hXq3JD+almIc0by3CMNnQnB92lAeKQlVG5yLJU3A5RLBvyOW5Y2U+Rgf1RS71KIWGb/F1ySc1RX9/3+hH4Txt6aDqTFjAqX9Z2vB3bYoI2QB5ohiUAk+okuVwMvrbaz51Mvbh4FHSyLW09MRctcnrD8WPErXfrrMRejBLl9DOsR7pLgquxZLnjdJqToqKDcniUHDmOYSa+3iKOZMcRYmEXRWJ0zJXJ8ZMaH58azjibIP0gUTknCoL8RUPg11tN5FRipDAnytnVrCKqFpfMZwBJY5afJPjgJJi7o5BAP5vt5zUX3HYZ6hl893FsKLya0y4GyWmnzhgH5KZ+xvoG7m6Q/9RF1s4bjToub7zWyH3n7L2GMSuvVF+62ui6ixro0thrjD7KnbGln8BqwJVYCU2cZp3786sh9PEB0k86zwLUGdKuiY730eARxeqnYrl4/Zdk/wE='),
			this.addDataEntry(dt + 'three line list avatar icon', 358, 642, 'Three-line list with avatar and icons',
				'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'),
			this.addDataEntry(dt + 'line item primary checkbox', 358, 56, 'Line item with primary checkbox',
				'tVRNc8IgFPw1OepEaKweq7Ze7IwzHnrG5CUwQnCAauyv7yPgt3Y82MxkAssuD3YJCR2rZmrYmn/qAmRC3xM6Nlq70FLNGKRMSCqKhE4SQlJ8E/JxZ7TXjqZrZqB2jwhIEGyY/IaAzEQNnuBA4ceChNxBEWjW7WSkFcxy8JOkCR1ZztYeN8jFbimkHGupTUulZft4mjN6BfuRWmMhOtqAcSJncsaWIOfaCid0jcNKFIUvNmJSVB6QULoT/luED7xS124hfvw6epmvtma5qKtZK5u8EoS2HLe1QNyTtmg6Ytwp6SXYjF5gAWju+tlC0cwpaAXO7JCyFYXjgUGzQZBxEBWPsqwfMGZDvzpIj+lgIwZ0Oyx6FdZjsaim8gesW6lCdnMO+Wqpm3t5XISXDobDjB7IX3Gb5FG7yG27dvFwdrMgObGvd8O9PWZAMic2cFbulqWx4lwLXAhJ9+uLIcTqneH5BLosLbirRA7Lfiikl2eEpMBaVsFVRqd/00VQ/fZ5elDngj9iixfNf8TWoc/PDbvHWzbQTy/hXw=='),
			this.addDataEntry(dt + 'line item primary checkbox', 358, 56, 'Line item with primary checkbox',
				'tZRRb8IgFIV/TR81FabbHqduvrjExIc9Y3tbiFAMoNb9+l0KVp118cE1McLhnF56v5aETlQ9M2zDP3UOMqHvCZ0YrV0YqXoCUiYkFXlCpwkhKf4S8nFjddCsphtmoHL3BEgI7JjcQlDmogJvcKDwb1tZkJA5yIPRuoOMxpxZDv42aULHlrON1w16cVoIKSdaatNYadFc3uaMXsNxpdJYio53YJzImJyzFciFtsIJXeGyEnnui42ZFKUXJBTuzP8W5dZX6Motxbffx2Doq21YJqpy3sSmzwSlPccHW6LuTXtsO2rcKekjOIzdwAJQ3+xoI8V2zkArcOaAlr3IHQ8OOnwJMQ6i5DE2HAWN2TAv2+iJDw4iom5c9ArXfVhUXfpXrF+qXPYzDtl6pesrHkhq1Fy/CEZOwfwVH5Pc2y7S3a5DfD37wxA5a9+go3tHzYBkTuzgolxXS2PFhRa4EZIe9xchxOq918sb6KKw4K6ItNu+C9LTIyApsJaV0MWo/Zp+fWUtu8eCugz8gS0eNf+BrUcfzw2np3M22M+P4R8='),
			this.addDataEntry(dt + 'line item primary checkbox', 358, 56, 'Line item with primary checkbox',
				'rVTRboIwFP0aHjXYyqaPUzdfXGLiw54rXGhjoaZUxX39bmlBnbiQOAihPT2nt5xTGtB5Xi012/NPlYAM6HtA51op41p5NQcpAxKKJKCLgJAQn4B8PBgd1aPhnmkoTB8BcYIjkwdwyEoUYAkGcnyVICE2kDhaac7S0xJWcrCThAGdlZztLa6Ri91USDlXUumaStP6sjSj1Q6akUJhITo7gjYiZnLFtiDXqhRGqAKHc5EkttiMSZFZQEJqrvhvHm55qSrMRnzbdYwiW23PYlFkq1q2eCUInTh+1gZxSzqh6Yhxk0srwab3AgtA9dDPGvJmLkHlYPQZKSeRGO4YNJo4GQeRcS+LXhzGStfPWuklHWz4gLrDondh9YslrzK7wYZZnsjhoQT9KItfwU1Ce/c1hnQbc/bbcBg5yZVR4/DepwbTIJkRR7gp12Wer7hWAhdCwmZ93m5ffeB/g3YGlaYlmDvz23X3ymP8H3nEHOLdVlU9Mwkn02lEW/KXd5M8mdKt4I/MRh17u8GezGxAf4U2fT4z7F4OU0e/Pmt/AA=='),
			this.addDataEntry(dt + 'line item primary checkbox', 358, 56, 'Line item with primary checkbox',
				'rZRfb8IgFMU/TR81Faxzj7NuvrjExIc9Y7ktRFoMRa379LsUqs4/i4mrMcLh3F48P9qIpmUzM2wjPjUHFdH3iKZGa+tHZZOCUhGJJY/oNCIkxm9EPu6sDtrVeMMMVPaRAuILdkxtwStzWYEzWCjxZ1vVoCCzwL2xtgcVjJzVAtxt4ohOasE2TjfoxWkulUq10qa10ry9nM0avYZupdLYik52YKzMmJqzFaiFrqWVusLlUnLumk2YkoUTFOT2zP8W5KMv15Vdym+3j0Hium1YJqti3pZNXwhKe4F/bIm6M+0xdtSELZUrwWFIAxtAczfRVgpxzkCXYM0BLXvJrfAOmox9mQBZiFCWjLzGaj8vjqUnPjgIiG7jole4HsNSNoU7Yv2i5Kq/rcHcY3EBbhy7z6PBkNvBHMJB7Ce+5CyoYXydU6cZUMzKHfxqdyu80HGhJW6ExN3+Qtyhey88CMc76DyvwV6Ff9z3QzyG/8EjE5CtV7q5YoIARu11ASaw8uavkCZ5ktLvgj+YDW6c7U57klmPXkB7fZ4ZTk+vU28/f9v+AA=='),
			this.addDataEntry(dt + 'item list', 358, 56, 'Item list',
				'rVTLTsMwEPyaHFulNilwJA1wAQmpB86m2cQrnDhylibl67Fjt5Q+UKTWUiR7die7nrEd8UXVPxvRyFedg4r4Y8QXRmvys6pfgFIRizGPeBYxFtsvYk9norMhGjfCQE1jCMwT1kJ9gUfecfKEHm1powKai1aC48QRT1spGocbWNkiaYFKLbTSZkjlxTBcGhn9CdtIrWvLSddgCFdCvYgPUG+6RUJd23CFee6KpUJh6QAFBe3lPwR4l1fompb47fqYJa5aI1ZYly8DLbtlFuokEiwt7pI6q7HFJFXKUew0bN0WgP6sfAMUtHsGXQGZjU3pMCfpM3hy52kSsJSBlsw9Jlq/LnfUXzPsJPhx2ht+5M04W6q+dOdpWla5mnZY4DkvDoybD2OsMOy0MJtw6qaJp+wJxW6OddruyYAShGv4U+6UeKHim0bbCIu3/QW5Q/XJ7OAPuihaoCPxd32P8uPmGn60HdJKunPeNsP1yQrsHSX1kSUJciR3KUa5Fj/eZ8ntha79JfzjIZ+f8DC+ioeTZHZgYny5iXb5+5j69P239gc='),
			this.addDataEntry(dt + 'item list', 358, 56, 'Item list',
				'rZTLboMwEEW/hmUjYpekXZak7aaVImXRtRMGsGowMtOE9Os7foQ8SKtIqSUkMzOXMffYjvis6l6NaMp3nYGK+HPEZ0Zr9LOqm4FSEYtlFvF5xFhMT8RefsmOXTZuhIEarxEwL9gI9QU+ktIMqX/pMy3uVMhkoi3B6uKIp20pGhs3sKZGaS6VmmmljSvluRu2DI3+hH2m1jVp0g0YlGuh3sQK1EK3EqWuKV3JLLPNUqFkYQMKcjyqfwrhvi7XNS7lt13HOLHdGrGWdfHmZPMpo9C2lAhLituiLflMsRIrZSU0Db9PDaD71UIXCv69gq4AzY5KtjIjl1wFTx68rARZlEGWTHxMtP696KUHIDQJTC7z4QM+12GpusLuqVFRZWq06pGeAyFUEzf6zEf4KXatOeyyObuw+0aJlxyZNY6HXo2DfwaUQLmBk3aXDAwdF1rSQlgc1rdXhO53j6cf0HneAg7875d9FZL7/0DSbiWuLQ/RNu4EzXPZWUnqM0sUaEX6wikiaCs3hucufn6cJ9Mb0Z0K/gDJJ0OQ4b65FeRdckZyv2luQUmvh5vVlx9fvD8='),
			this.addDataEntry(dt + 'item list', 358, 56, 'Item list',
				'jVPRbsIgFP0aHmcqpLrXtW6+uMTEhz0uTG4LGS0NRa37+l0KrU67RJImcO45vXAOEJZX3dryRr4bAZqwV8Jya4wLs6rLQWtCEyUIWxFKE/wIffunOu+rScMt1O4RAQ2CI9cHCMiKO47IoeUlhGLrzjoWBW8leGlCWNZK3njcwh57ZYXSOjfa2J7Kin54mrPmG4ZKbWrUZEewTu253vAv0FvTKqdMjeVKCeGbZVyr0gMaCnfFf4nwyCtM7Xbqx+9jnvpuDd+rutz0stWSInSSysEOcU86odWISVdpL8FpdAAbQPeviz0ULVyDqcDZM1JOSjgZGCx9DjIJqpRRli4CxtuwLkfpJROcxFimI2J3ET0WS9WV/lrNykromcBUP0Omt4lgVot+jJWPeCr2qDt02p1zvIGzNEiu3BoOcW3WgFnQ3Kkj/Gk35WDsuDUKN0KTYX/LoIjdn+Y3fzBF0YK7S2Dc91QouLy8yUC/frK/'),
			this.addDataEntry(dt + 'line item checkbox', 358, 56, 'Line item with primary checkbox',
				'rVTtboIwFH0afmqQinM/J24mi0tMfIIOLrSxtKStinv6tbTgFy4kDkLSnnsOtznnpgFKynolcUW+RAYsQO8BSqQQ2q3KOgHGgiikWYCWQRSF5guijwfVSVMNKyyB6yGCyAkOmO3BIZ+YgzbQBuSOcuXqSp+Yr2dYEbDqMEALRXBlcQmpabfIKWOJYEI2VJQ3j6VpKXbQVrjgRrM4gNQ0xWyNv4FthKKaCm7KJc0y22yBGS0swCDXF/w3D3e8XHC9pT/2HJPYdqtwSnmxbmTLl8hAR0I1bA1uSUfjtsGILpmVmKU3wTSA+qGRDeRdXIEoQcuToRxppoljoHjuZARoQbwsnjkMK7cvOuk5FrPwyfSnhO5SGhZLWRd2ssZFmbHxXoF8lMVNcPPQvkONifqNOfn5G8dOcmHUNLz3qcUkMKzpAa7a9ZnnO24E5XZe2/N5u333kZ//7g8iz5Wd7xvzu3MPymP6H3lUEnIwLqagBsYya54nY7kW/BHSpGeYW+zJkEboJqXX50My2/O16eiXt+ov'),
			this.addDataEntry(dt + 'item list', 358, 642, 'Item list',
				'7Zxdk5o8GIZ/jYfuAEHQw/3otgftdKfb6Xv4TlaCZhoMA9kP++sbCKAYYkETlxXd2RmJCYTnfu7LzAM4ArfR2+cExstvNEBkBD6NwG1CKRPvordbRMjIsXAwAncjx7H4/8i5V3xq559aMUzQirUZ4IgBL5A8I9EiGlK2JkVDANMlyrpbI3CTLmGctSdozvd/E2JCbimhSd4VhPkr68YS+huVn6zoio+5KQ6FEobelNPNm4q5fkY0QixZ8y6vOGBL0QNMpmLYEuHFshjmucXEYSoaFtXYzdnzN0UAmoMBpGDYfC7XwOoUE0jwYpVtitntxsiy/Jl3o4pRSFdsq/N9/so6x3COV4sfxRm7m6afNOYNdjH2sZijVW7jP9mmDfh2glK+9V8RyWzE6xIz9Mj3k/V55UnI25YsIsXHrQRzDhPMcUVbgghk+AXV9n+MiO6BGR29LTIXXi2igFwxGv//BJOjMhk0B6Y+YF2Y9GoitrfC5npy1OyuUSuO/0Axn1Z18PHMqR1+7Nf3QMMwRUyKenUWrYSYSELwVMXztJOZmk2y66iZN502JviWBRz73/YSXhpnZsnExXNIrgs3RzgIsglX9iYoZJuRX/OtO995X1dN/OPyY103p9Z88HQYM05QiHiY5ihtmR3Vd1KruE+a477HpmWsajb1tNi03E3p0qkBVXwdqvBpMG6Ck0rSmqMTY/qMS+1NCjSVBLpmLIFzhulKP0sraWSWlkT8Cp8QeaApzmawh4xKgjYgU0xNQW7bf1+oulMtUJ3aBrJjpsO+cCuhdtNk+1tyJ1f8/K9t8Kd6yHqkFgqyzgxIY1s6tHmOmySpQl83TmalkOD4VxdXKIRpzVfbkWXSxFews0wFJmSyJZnu8Irz6VzYen4ktR0jfj20FlLzayByp11GdCOoraiN7PNm0+JHD0KLwpJZhMoVmV4iVKXMYBgqF10+Bc9zmFPsgtG+YtQ3Ufax5brPAZ5FVfoYIanbmaROg0M/0mJUS/XlBCRVKDMYksr1mHsYYbK+YLSvGK0qTHoTQa77HGDYUOSOEYb6vWKofwKGaim2nIChCmWGwlBHLrx8QZDws7swtK8M9Y0kglzaOcCwS5E7JhgqMnVIDC2n33eGqpQZDEPlysv3MMScMBeG9pShYHeInkTQcj8NFbljhKGK+2z2MdSSRShP61iGTuvetI1ooqXEcgKIHnsL1EeHqFx0eUhoRM/q0v0ZgtQzsvLRcqdNvMkfIzD1usO04Sp955s72xVGSxzo1UVLoeUEMFVIMxiYytWXHzDA9MLRvnLUtU1cXwJabqtJ8tQxgtBZd4Q2OFMXQnfXoyYQCrTUWU6AUIU0Q0FoeYxthKI5jtFlMdpfiHomri4BLTfWJEXymMAoUIT9jFeiQEupxTxGVdIMBqNy+eUxpgm7ULS3FJ3YRhJBy001qcgdIxA94HGmprWooweiO9eXjNRGgZYyywkgeuxjTR8donLZ5WcCXxC5QLS3EPWMGFbLXTVM5E5HiAY4yyOheUqf86v87dyr52mm8kKU7tWpZUAn94M8zqSSZihgdQ8txnR64j57NSL1GI6tawNORLVxuR+9Kjg63PIE57+b/FJ9pal0kX3UShd3/3Ms1lV55XmffZqe2tT0sxU7C0gT5WW3RWWk1IqPxHGKeqXQ+QvUokqyF2nvqY5/bvLwzc2PVYnu279l9Rc='),
			this.addDataEntry(dt + 'item list expanded', 358, 642, 'Item list (expanded)',
				'7VvLcqM4FP0alk4BAoOXeXR6Fj0zqU7XzHJKsYVRRTwK5E7cX98CAcYIPIAlv0klZQkJ5HvuORInQgOPwefXBMb+n9ECEQ180cBjEkWUfwo+HxEhmqnjhQaeNNPU2a9mPnecNfKzegwTFNI+HUze4SckK8RreEVK16SoWMDUR1lzXQMPqQ/jrD5Bc3b9Bw8T8hiRKMmbAi8/smY0id5ReSaMQtbnobgVSij67BxuXlWM9SuKAkSTNWvygRfU5y2A7fJuPsJLv+g2tYqBw5RXLKu+m2/PPhQBaA8GEIJhsLHcA31QTCDByzAr8tE1Y6Trzmz60BUjLwpprfFzfmSNYzjH4fJ78Y2tTdWPKGYVRtH3tRijXpbxr6xoAFZOUMpK/xaRzHp8+JiiV3adrM0HS0JW59OAFKd7AWaOA8y0eF2CCKT4J9q6/j4gWiMzOvhcZiy8WwYLckej+L83mOyVyaA9MNsd1gVJ72xeroXNmopRM4ZGrbj/S4TZsKqbT2bm1u0nzvYVIs9LERWiXn2LXkDYAhAsVfE8HUSmdpI0GTWbum5rgtcoYBr/Ty/OpUlGlgxcPIfkvmBzgBeLbMAVvQny6Kbnt7z05JjHZZXt7Jcf621ySs2HqQxixgnyEAvTHKU9s6Oak3rF3W6P+w6alrHaoulUCk3Ly5QsdRWg4shAhQ2DMhIcFJLeOmorw2dSYq8SIFcA6J7SBM4pjkL5WlpBI2ppqYjf4BsiL1GKsxHsUMZOBW2RzPpSxTmuhE5NKRLqGgpyYSaDrLCWPs2kqM+Jjcxw8p+qRz0zesHhylFWV4myzhSAZegy0FrFbSB1gJFTieD4HwnA9NZXw2whkRx9BY1lKlABkzESJoJzARWwQfnRKqEqdatMtz11ywAqJrEyR2pBfsIhmwQudQJrPGhUjyjnP7EZlhIWit7LCLFc8Jwa+NjYK+hGR9R3CWPbylPO/FUu25XOX1KclMHz115oXM2kJZorTPDguwfTbCiaOYVBFnj+l9W8Jatw7gv4sRgPUbqmq+icmqto7Umv0v/QbRWgiQ7IX+iDVdwHKGHhD2/w9ITHVsIp0Qp5XaU+ztgDE/FR+wZOKzhAV/Hka4g2SL/J6DJX6cBS4dAaor/wZbGaw3ydfKEL9fNfkANLxerPlOJeoCp9+iVFtS7sFXeer8M8pZZ1nyxP6QBrcnOsWXFgT6kLmWtZn5ew1HB6hgEm65uMnuq6xdKnKhJBiq/h8dxRoaFdUb9gDT2OrzFYQ7uQuRoNFT2OPxAkVHQxbhp6KhpqK9FQKTtHfJ47SjR0xK6RM9dQKdtGDqCh+24eOXcNFW2Tvz0PM4W5aeiJaqitmyoSQcrWkYjnjhINHbE/RBdBKL/WvhrqbnPTUOFpgjPZIHLtO0SAaLq8JFEQ3XbgnbaQ2rqKZBCdnRGkjTf5o0JMQcdbNAM32w1+R6NDTBub7Uo5kIuLFKNFvZh2QXM1YjrWfRn0Qkh2SP/f3nqrw4FUbGKp2I8HRG9lBFve4Py9jS/VFNaFy8hdPzx3Ormj35WW0S76tG0qlvRWVePBW8VLVaCHF1JixXriOBWX68dE6PIB6uGM7JS0Y6LjXBo8rLh5l5o3r79q/Rs=')
   		];
		  
		this.addPalette('gmdlLists', 'GMDL / Lists', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLMenusPalette = function(expand)
	{
		var s = "perimeter=none;dashed=0;shape=";
		var s2 = "perimeter=none;dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library menu ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'menu simple', 170, 168, 'Menu',
				'7VbLboMwEPwa33mkNNeGtumlUtUcenbxGlsxGBknJP36rrHzEkmTvm5BArGzs2vvjCUgaV6tpoY24lkzUCR9IGlutLb+rVrloBRJIslIek+SJMKbJI8nsnGfjRpqoLaXFCS+YEnVAjzigdauVQAaMLICCwbDWteIThhtBbgOEQatoI2jGihwyQmXSuVaadNXp7y/HM0aPYe9DPSXb8B0h2CMQdgPGAurkzP1UBhoChp3Z9ZI6SSzIjBu/dyRAFmKTVk29iBtPVBua3cS4UtQ6bhi6UCxV+AGWjEQDidwgrhZZEHVnZJljZlKMuYoE65rO5Mfjh3fOB0aWsi6dGGGIfbE5FuYyWnTCWlhhixX0uGZQUzYSn1HuuRn0o3CuTCgqJVLOOh/TM6wxIuWuPKOojlvwQ703u7kIgtGAwueQDXEHfWMVk4V/0SEA7B3Wsyv5nxhzvqwzZ96dTPwagbWopLt1ZLzloxH/2BJNrTEKZ1EemGvppw3Jd4o+BtXMNx95T19/yfgEw=='),
			this.addDataEntry(dt + 'menu simple', 170, 272, 'Menu',
				'7VhNb6MwEP01XCtjEmiPJW1zqhRtD3v2xgNYMRgZbz7216+NTUoKUT9iemlASHhsz3jee2MjgmhR7peS1MWzoMCD6DGIFlIIZd/K/QI4DzBiNIgeAoyRfgL8dKY3bHtRTSRU6iMTsJ2wJfwvWIs1NOrAnaEGyUpQIHWzEpW2ppQ0BRgPSDeagtRmqIS1DplmjPOF4EK2s6OsvcwwJcUGej3QXtYBFTttDHXDrQekgv3ZnFqTS2gJQq9OHvSQHaOqcCMSmzcqgOWFm4YTlx1prCE/zn2FSL84lMYRiwaIrSRsGey+DFy5zw3/N3lJ+U3tnEWpwYCtCb/nLK/MMEapcZ0SZ+CQGcA5+QN8JRqmmDBmaRNOM1GpF/bPRAjnJlxN1qzKTTPWTQmN7vztIAsHDLkVv6EzmZlb2wtV8s9Qht+nLB4yFjrCJHCi2BZO3I+x6CKsBNOBMerWk9gZh9NInQORZQ2ogQiOy/yQLmYDXbwUOn8/qmiMq+gniuJ2RBQzP6KIT0QxTyYQxXwgiqXxiTirNn6U0Xq66qK1oSl0EaJwAmHE75+7Hd2aYRilYEQv5w9ZX7iPnauXAt8hjafYl5MB0s9kAyaKftaiPvipw9bT5XVoCexYxpdXZr8M++XpEpugMvGIQGIvlem+ZY96maMJ9HI70MuD2FVcEOpHKLTz9gM37e+Txh2eQBp31017sGkfkfeKdLe4HtS/oBRbT5/T0vq6VuB0FYhnHipQN19/hdjh/T8l/wE='),
			this.addDataEntry(dt + 'simple menu', 280, 160, 'Simple menu',
				'5VVNb4MwDP01HDsBoYhry9buMmlSDztHYEi0QFCSlXa/fg5JP1ZarZMq9VAipPg5duz3EiUgebNZKtqxN1mCCMhLQHIlpXGzZpODEEEc8jIgz0Ech/gH8eKCNxq8YUcVtOaagNgFrKn4Aoc4QJut8IBmtLNTBQWmnFdciFwKqQYvWczsQFwbJT/hyAPDZz2MlrJHMELD7wfKwOZizQPkC16CbMCoLS7ZOu9k+pRmCUmiLEvDDEcMkyhxWXpeGuZby1zrIQNes13m1INUO6Depz+whBNP1HnSyIi0FcMGMemwrJWGV7yghssWzUK2xnZ2yisSMPCJ7hX/tmBEvH3EYjh8iFPB6xYxAZUN0x0teFvbqHSsyp57SzSWImY+uuFlaQuYK9C46YenyyrTM25ghWltKT2eSMSYacR/hIvPC/eXKlOPKRDI2hp+5T+nlN/iXXJL7O5gRCfayqrSYEbK7gu7SuxkJPYrL8FKCa3mQ7X3kfyhpD29tjeRdnpJ2vvd44cSNbrFhUXz8Fy65cev6Q8='),
			this.addDataEntry(dt + 'simple menu multi line', 280, 328, 'Simple menu (multi-line)',
				'5VbbTuMwEP2avDsOLeURyuVppZW6Es+mmcQWjh05hrR8PTO2oYVQ1EILldZVVfvMzTlnpkpWTJvFjROt/GNL0FlxlRVTZ62Pu2YxBa0zzlSZFZcZ5wy/Gb/eYM2DlbXCgfHbBPAY8Cj0A0QkAp1f6gR0UrS0dTDHlBeV0npqtXXBWlRhId55Z+9hzQJhkUWK0vYI5nhI9cB5WGy8c4DShW/ANuDdEl16VXqZ7j2Jz8UkqFqmsIJPIii6CNSvsSsKcJNY+JiRYsDIP+WRC85qC12o6GBAEj5NIMcaP1NPBOZn6bxGCQsLcaFVbRDTUFFY14q5MjVFjfFI7Ki50OfJq1FlSYVi+lSUyHTQYbHbRAshvVQeZpiOXHpsK8Skb/Qu7POvsT9O5DvQwqtHeJP/O4qcDBSZIVlBEq0M/QT2dxZo9GWB3s0AMPp8JtxRCTViOwqVSvy1yhDNy7d6v0TYqurAD4R9vdhWWo+G09fbldBEVAvlBslZI+5JJUznkzN5UryJ7jHNIVtjYwt8JPiwLX6oBU730wJ5fogeGB/dvP9Xc51PDiHq6XCwpYM1Tfcz2kwYSjFHmZV5CAm0NTW4F+87+N2OOaq/gbP9dAwv9tAxeFy99kb39bfiZw=='),
			this.addDataEntry(dt + 'menu items', 318, 126, 'Menu items',
				'5VbLTuswEP2aLKnSpGm7vZTHCgmJBWvfZhpb2J7IGUjL1zOOTekLEV4SFEtVM2/PmTlKknxmlpdO1PIKS9BJfp7kM4dI4cksZ6B1kqWqTPKzJMtS/iXZxSvWYWdNa+HAUp+ALAQ8CH0PQRMUDa10VNTglAECx6JFy9rTUjQSfIaUhUaK2rs6mHPJ04XSeoYaXRedL7rj3cjhHWxYoDshQYktK4csxPuAI1i+2lOnig1dAvLt3IpdWlWSDB75cBrCJKhKPodl46AUTVBU69gXiPghonQYsXwPsSuw996BwPCfR2gXQu7FQ+O7UnOh/2lVWbYQ1h4wtHSjHr3rsPBw1GKubOXFMYsOGjbextY8RK3kUjfs5UNaXh3WSTL6PQhmH0NwFNfDgRakHmAr/2dQHX3dHppl5ek0qEypB+SUsJWGvQWMGXa2ddwdn1n5dVZoO1fnQekHbH4Y2O2AVaTmoAjyBuzFgbVN3wl6LH+Nim+1rn2STbZDcLFogPamtL51r8EVb9CBWuxLB6PKspvUUTNiZzir7TRfOpvxsZCq+PmkitVPim+Y4+QtjkkHvV86/5EIzd9k2XT0DdOZHgvLJr+HZc95PzNIFl++s4P75mf4Ew=='),
			this.addDataEntry(dt + 'menu', 318, 126, 'Menu',
				'7VbbTsMwDP2aPoJ62cZeWbkICcTEJHgOrbtEpEmVBLby9ThN1q3rJo3bA2KVNtWO7djn5KgJkrRcXitS0TuZAw+SyyBJlZTGvZXLFDgP4pDlQXIRxHGIvyC+2rMaNathRRQIc0hC7BLeCH8F53EObWruHRUoVoIBhaaQAr2TnGgKtkKIhqaksqEKMtxyUjDOU8mlarKTonlsmFHyBTZWoHlcgVwu0Bmh4fsBZWC5d6bG5Qe6BondqRpDFiw31EUk0dilUWBzukqLR85JtHPM29w1RPjiUdqNWNJD7L4C0UMN27do2EFYRvg5Z3OBKyXLc94MXZGMifkKQ2fdQmFbjUYWRynMjL3bctEQbQUarSc/ooVqQZmBGWbamAUeIfRRU/LPIBl/DcmBPyYKODHsDTr1v4PuoIduWoo8iCf3+xDm5Bn4VGpmmLQIZzibPast9LdbAS0FxHOi3Fz7udqm4iBkk93IdhNqr9HTobM3cI/CUR93r+bDcfcNTCXDvtrdT6JVoXrlCLs1ZFFoMD3m2kEOInPYI3NKtAEbISxa3B7do3A+Q2DdLfOjdI16dM0oK+yuqD/8f/xrEhweJXjW4/QBNBCV0aPwviK88eAXSBrvuFKsZdcVofsceuPmryny7N8pEs31bd6Fb172PwA='),
			this.addDataEntry(dt + 'menu', 318, 126, 'Menu',
				'7Vhtb5swEP41fCziNaUfl3SrJnVatErbZw8fYNVgZHsl2a+fD1OahERNWFNVCkgI7nxn+57nOQvhhItydSdJXXwTFLgTfnbChRRC27dytQDOncBj1AlvnSDwzO0EXw6M+u2oVxMJlT4mIbAJT4T/AeuxDqXXvHPUIFkJGqQxK1EZ75wSVQDO4BlDFaTGUAmpWXKeMc4XggvZZodZe2GYluIRNkagvewEVDTG6Ruj2w9IDauDNbWurqA7EGZ3cm1CGkZ1YSNCP7FpBbC8eE4LZtZJlHXkfe4LROalQ2k/YuEAse81VAPUzPYRDSyEpYR/4iyvzEjJKOVt0TVJWZU/Y2ite8hwq/4McRSVfmB/cTo/NrYEZaxfXYkIVVMwDQ8mE2MaIyHjK3TJT0EyGIdk1MlEAieaPcHW/P+DbjREd7Qgy1WOfeXmJeVuKsqSVCZkzslv4EuhmGYCKZG2rJ6q+53xnjLScchblg5Tu8vcUUSE+4nYTlh3Le3G1t6gyQ/26f1Elrr1l4KZbfWLX0Xby1/tdJHIMgV6wHJfxVHExwPil0RpwIgKoeIo86nJTqFvvT3Nm9I1G9D18zL6NL7wPr1+/YNhl1cipWhUYJ8oAoafCpa0SkhEZk5xz56LPUmxnMhNJgmMkEB8fX4JJAMJ/AAFRKbFdECPOaCT6Awk3QxI+noZB3TygbszDM/fnb43ndAfWQPRzTtowH9dA6OaX9R6In0E6bP4zUk35stvIhu++RfpHw=='),
			this.addDataEntry(dt + 'cascading menu', 636, 632, 'Cascading menu',
				'7VxRb6M4EP41eWyEMZDsY5O9W53UO1WKVvtMghOsGhwZZ9vur18bQ9ow0CUJ3mvXRKoaGzzg+fjG449RJniZPX0R8T79lyeETfBfE7wUnEvzLXtaEsYmvkeTCf488X1P/U38vzuOovKot48FyWWfAb4Z8D1mB2J6TEchn1nVsSeCZkQSoZo5z1XvIomLlGgLnmoUabzXpwqyUZdcbCljS864KEfjbfnRp0nBH8irI6T8GAMJf1SdSDWq+yFCkqfOOZVd1YS+EK7uTjyrUx5pIlNzBkZzMywldJdWw0I/MJ1xYTp2x7EvLlJfKi+1ewwDjy04S4DX1O1rb+iJ0E3Mbhnd5epIRpOElZPexxua72ofmtYd2epbRZH2I8/liv7Q5lCo2oIUqvWtmqJ2VQswjymVZKWM6WGP6qlSfanM2DnO9S9zblA9OYKwWNLv5MT+NQ4PoMMvfkazp52m2nSXJWy64VkW5+qUBYvXhN3zgkrKNUrCTOuI3l3j+BHFuIKVlcB1o90EsxcQuB2I0wHPFcunoWm/ggn5ECV0LkrV9e85Vbd1vPhNcHr5m+jUAt9uCyIBysdZ9AI+BMD/I5XDNyPXzuZaA8XnUzODohZB1Nyga+g4XWcA+K95QgSjCt+RscMwdh5YAG4OgXODsTPHGfsJAL+Sgj4oA/ywS0fSDkRa5NsAD3kAvVumjC5WKd3q/2EXgE0ybpSftMf7s7FJ31/SsQXXXsB9upahXgRhrbbEV1MU1YZqjtaQDIszgiw9KH8WG0H3ciTpUCSN5jbAg/rK1I21FXVoNM4srggKRavDemTtoKz17YRcKDlN/KUjvHVddUJQdgLI18iWe9u3pO1eNLTJM3RlrlPzLLQhFSGoFd3HIi7ZUju8ODtWNh/7l9hZRkpXImNkBTEo8gwTFtW+M853DLKpstB4qxSVH22Z6tdOJkDmXGjP9oxz0ZVxLhyebHWYw/PTMBfaQBKqPoZJI90uoRv2bChzCCo0H5Vuc7fp5kO15q4Uxr1VxZeBeddA8LyM5A/gY2AjN/ShFvNB+WieR4f5CIWZ/w7ZmgiFk+/d0eL8Pfq4EJa25zZ0tJaqm49KvA54nCEe1FYM2zy+1/4c93uX8S7ANpSwlhqcj8q7wHHeQa0FIOmcrBXMbIgkLZUwS0Ziobq2XGSxlJfk++MrgA4M51YwhPKINjdI7HvvrwCcr4tpKYzpjJVV1Xt3rOysh39d9X5p+Hz7JeuRds1N8a+o6c+jbmB6F8pDyWNFyzV/4AzvNBaqkP47Y19Hhcr/Vi2PoUSBpqizFmj0+fuomsZQj/jMD+uRLAMCZ6V4FkNlYnkoJM8m+FZ1oylcOkYEL0XQTiUlbiv3GCTRS8nmoZECVINNvlAj5rdlEMc9by9kcEfdxltpWtvGKrgOqDrziE4Sj5uZDdj+GG2iCztXtAn8TrWJC4PdQOKEnYpUDMWJ2yTRvi5XBt9bky0XxLiiLsWxuYD9ZpH2Qkzr/OxaTGdWMG2p5TjBNN5qR46Q2oDUTgkqPkOCcCck2tl7BVCoqFJ4wyD1YE+nsGzfRcpcmR0OWU2qmi8/k2FOf/0rGj8B'),
			this.addDataEntry(dt + 'context menu', 85, 190, 'Context Menu',
				'7VZNb6MwEP01HDcihkL32GbbXLpStTn07IUBWzEYGedrf33HeNKkhahpsjm0qiUk+82M7XkPngiiSbWeGt6I3zoHFUR3QTQxWls/q9YTUCpgocyD6FfAWIhPwO4PRMddNGy4gdoeU8B8wZKrBXjEA63dKAJawRs3NZDhlretNXoOE6206eIRdAMjhVRqDy+64SoEz/UKwTEuGjCyAgsuqda1q6MrgLGwPthGB1EPU9C4hdlgykrmVlDGT7q7AFmKbVmceJC3Hihfanes4ISIGSYp6pE0E9jQW6Lw+o4g14jMuLpRsqwxUsk8Vx0/urYz+c9lj68cLw3PZF26ZbJbPkBht5CBFvOfqMcD9K2EtDDDYrfxCt8kxIStFFUcxS47jd2YMAOKW7mEV/ufw3jcY3xqMMZCJWto/xfzRHXKPgHV0UeppiMetcSTWbh5rdi2QhdFC7YnzcvFjlLr6n0TGSAz560At0PoPaIzmWpdOi8clVWuRpmAbP7GWKjYu9BWLjbkS0k3jpUlHpaFaAtH1OO+TNdDdnOeSnS/iEyLTv+RXkC0pCfaIy8Bkb8G+Pz7Gzv9G0vjC8iV9uT6s1DfVniGTOMwuYBO11/AC9Mv7oW43P1h+/T9H/Bn'),
			this.addDataEntry(dt + 'menu disabled actions', 170, 222, 'Menu with disabled actions',
				'7ZdLb4JAEMc/DXcEfPRYbLWXJk09ND2uMMDGhSHLKtpP31lYX1mNtpZLI8aEee3u/H86iuOP8/VUsjJ7xRiE4z87/lgiqvYuX49BCMdzeez4T47nufR2vMmZaK+JuiWTUKhrCry2YMXEElpP66jURhhHCZLnoECSWWBB3jBmVQZ6BZeMKmOlTpUQ0ZZhwoUYo0DZVPtJc+k0JXEBBxFornaBGGty9sgw5wGpYH22p8ZlGpoC0unkhlJqHqvMZAzbvt0MeJqZsl27rGod6a52LxHdGJVOK+Zbir3QIpZqdHythm6ER0w8Cp4WFMl5HOuUMMFCzfiXzu71tQgli3iRanNApoSKgh+mIS1MnXEFM8rSJTV9YMiXqVz8RDfvd7r5RjYJgim+gqP1T2lptnhDTjt77sYUuMcVmCQVKEv73cGuwhFYOEIWLe44LuMIvA5w9C0cE5Q1k3H3RHTBwXiZN69/QWoYdEBqcHnybye74M3UPz/BbRhdqrqdIzePo0EHsg4tWd8hoo6F7iwSWMH9q3ALtF4X0EYWtCliKu6/6tcQCUYdEHmwiHziUi3ndyTXIBn9wT8tMvePIW364VPKNw=='),
			this.addDataEntry(dt + 'scrollable menu', 272, 420, 'Scrollable menu',
				'7ZhbT8MgFMc/TR9NoLS7POq8vGg08cFnsp6uRFoaim7z03to2U101c7GmJRkGRw4cPj/aAInYLN8daN5md2pBGTArgI200qZppavZiBlEBKRBOwyCEOCvyC8/qKX1r2k5BoK8x2HsHF45fIFGktjqMxaOkOV8dJWNcxxyovKaPUMMyWVrvsZ1AV7UiHlnj2ti/XIeKKWaKTYcOuBNrD6Muba5AK+AZWD0WscshSJyVzcYxdoBmKRObfIbZbwqjEstr47CbDiVPhcEeYpcl8aoQo7xECOf9STCPdipbG7EnMuz6VYFNiTiySxQy6qks9FsUAT2bVuIbVx05GVThXmUbzZ6WiMbQ0Vtp7cfq1uywxXf0RPO2aJ5wVtmcnlT2QNu8ra2DRIbsQrHMx/itRRq9T+aRykPpDaLfGgBK4ckvXhNBsPlaYVGA/NNrBv0YpbabGBVhdak6gHWqNWWtFAqwstupH2V3GNW3HFA65OuEaTHnBNWnGNBlxdcIWU9IBr2oprPODqhCvu46axOQNHeE0GXp14Tfu4a1Daymv6F7w+PEi3D9X/z5GxPi4h1M8GeG9fMnx4nYCNewHmJys8PEfTN4UqPsncJHU5UdhDhz2ZI19kOiWnqewWO3Nzb6/q8emiY3OXjmuG72fr3gE='),
			this.addDataEntry(dt + 'cascading menu', 604, 590, 'Cascading menu',
				'7VxRb5s6GP01PDbCOCHZY5PdO03qpupG055JcIJVgyND1na//tpgaOCDlhDcVoFIVYPBBp/j8+Hv2K2FV+HTN+Edgh/cJ8zC/1h4JThPsm/h04owZjk29S381XIcW/5Yzr8NZ1F61j54gkRJmwpOVuGPx44kK8kK4uSZ6YIDETQkCRHyMOKRLF36XhwQ1YItD+LAO6hLBdnKWy53lLEVZ1yktfEu/ajLEsEfyMkZkn6yBnz+KAuRPNDPQ0RCnhr7lBbpDn0jXD6deJaX5BWQm1V5pH4SZGUYLbKygNB9oJuZYn2hF2cF+6KtF8jkF41aPYIYILjkzAcoyu4odFTH6NZjt4zuI3kmpL7PUhAO3pZG+xzT7OiO7NSjyv5IXHmUrOlf1RyayWNBYnn0W3dRQfcY0ISsZU11zaMcUrIsSEJ2DrJOPbJvIqmHjSDMS+gfUmr/EnSnEN3OAzR82iudTfahzyZbHoZeJC9ZMm9D2D2PaUK5okRk3SqouqucLyjzNIcsZamZ2ipzrYjArw/xrMKzlvhkBgY8ciBL6FyW9P3vOZWPVdz8Zlq+/U1FRXy3i0kCWC560Yr4GSD+eyIB347COouy53IzvVLkQoqGoc3ZwLU5B8T/inwiGJX8jvLsIM/F1ABLC8jSMOQ5H7g8vwDi14mgD7IBftwHo0K7KBQ5JphCNqDqlslGl+uA7tTvWRNbVeVtJU5Kxe2lV9VqP9r7cqn2bBdyqHPYi8WH8oZy9eX490sqgvo7ykAbbwU9JKP8OsnPXZhgCrofk2G8ItEbDsrVvyMRtG3Wx80o0e4SdcwEU2gAWc5qICIdugeEoAkEmM+ZTZPP11xmqDmTokIXTllyUc1MGDcIOjf3nvBSaeToxmdHweoYf4mKaQy8ypjnGqEH+iv9BDyZBXrRnkGd6BYqSzdu+lEtU7W2k4W+iAuFbMsI5l4YwWb9KysPYHhRDmAzE0xCD+YuNcnsXBwNIqswUQSxUXwvjGHbhGuGoHvy8xhuiJDScmxG4/Onh0PkZmpiPuBAu+QuJcTmBxWexndWG2oWJlJpB5oegIzrnqpNHRP5Tw5jG1z1BoxmXBu3ZvS8AcNZuKV3axGp36KiqHjJloGaHRlrmk57eo4O5UR/7pgLGO8VMVpDDLNyNEGNZvUI8AesztfsoPjKj5tRBl1ZMrJIW7OJYnWMEx5a+FYWowkM9/3T1ZRtXCWNZlbyavZEAOK6mZQB2T5UONKVsxd9To9T9+ovUvh2zDSk669ZjHUTqullROkHxOVJxM3cBG0wQe+Htne3Wpq4G4rVUrPrATBpPAH52AzEzCIprtmj4PtWZmEpK2tDdlyQDIrcQzb5yjKZmXckEPf0apobIRCm5mUCvZ0KbiN/n3QJNH+4AUc2MxkShkaBnnsX/vxkAjeEXL0YLpy+GV26xNB5aBTDx/thRX6vYT6BvrC6yovzi2aYW/9BEkz82y06dRjRDftdzAzojPtXB3SxRPAuNhiGyXu/CfsJvP/p/qT4Vvdw9oVkucYJrm7NYL00H8+zA9dEPo5hPl7a4pAroZi9jpL4LMYlhjn5qKrOqjLKFMy560WmM4xRY5/Fdp7CpB5N+ly/GaLG+mBKHr788X92+en/Bvgf')
   		];
		  
		this.addPalette('gmdlMenus', 'GMDL / Menus', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLMiscPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library misc ';
		var sb = this;
		
		var fns = [
			this.createVertexTemplateEntry('shape=rect;fillColor=#eeeeee;strokeColor=none;',
					358, 642, '', 'Background (Light)', null, null, this.getTagsForStencil(gn, 'background', dt).join(' ')),
			this.createVertexTemplateEntry('shape=rect;fillColor=#333333;strokeColor=none;',
					358, 642, '', 'Background (Dark)', null, null, this.getTagsForStencil(gn, 'background', dt).join(' ')),
			this.addDataEntry(dt + 'keyboard', 358, 224, 'Keyboard',
				'3dvLbqMwFAbgp2E5Fba5LgOddjWrWcyaggNMuA3QNunTj7m4TXyIShuEhSNVagxO4Qtw/LuyRvz8+FgHVfKrjGimkZ8a8euybIff8qNPs0zDehpp5F7DWGc/Gn64shX1W/UqqGnRzumAhw4vQfZMh5ahoWlP2dgQBU1Cu911jXhNElRde01D9vnePs0yv8zKut+VYItg4nS7tXV5oHxLURasjxc0Vd/rfp8euw/0xr9N65Yerx5/3zQe/CMtc9rWJ7bLaxq1ybAHMZ2hW0LTOBm7YWwMjUEzNMTvfT842C+jyLQOATr/AA879l6iLNoziaf+Nbb/Tt+6ndkREa872zQMsl2WxgVrzNMoynqdsSFkZ07Zp3hJm7PjukcdZxWEaRF7ZduWOWv7Yc3Vw9N6vMP4bZ+42fD23FaHtLztFlkDyL4qJWtYsmRNIEuVknV0WbIWkK2VkkXIkEVrA9pWLVrDkUXrANqTWrSOtCLmAtpnpWgxklbFkA5sU7VsTWl1DCFgW6pl60grZHxEfWZbKWVLkLRKhmAcC5Sy5cOgkdY216OFeaxRitZC0mhhIIuUonVNabQwke2VokV8iCnBFkayWC1bi0izhZksUcvWlVfJYCj7q5QtG4HJssUwlB3UsrWk1TIMQ1mmlq0rrZbxjHJm+6aUrTC6RXyqeg1bGMqOStkKw9tVbWEqC5WyFce3q+LCXPaiFq4wwF0VFyazJ7VwhRHuqrgwmhVK4YpD3FVxYTbL1cK1JBY0GM7QTFy3f13iIv27uEs4YoFxNUUCYxjeqqJpSVOEgYtsVdHVpSnCaGVsVRFhQxojTFHmZhlNRxojDEzWZhldeQUGRiN7q4zvV4AERhiCnM0yWvJKDIw77mYZXXklBgYbfauMBMsrMTDCAMXJFRP5Me5WedzFeZTdNUm676An10kIiyp2aGfv3IWuPyFYEzgJz8/ncjHF7XAGTC3fgHsKwkOXjKkEPIKEZyCBlx2vNud6/N+9N+nBtKKRBzQ7skzNTaCvzU0sIIiESTPbXu2+NWBQ0bB/g94XZ3YW0LOEAaFtrKcH88ndpuzArJetr4cHUwmw4w871jOtmrlPN8P3zJ230NNNF2qqNXFzTjzdeNtNQjBwfKM2hAkND0COMe371/uWP+MJ4blwwxd4/an26dAYTVWFJWoqTBhXr6xxxeacy4r4hm34rL0un4uoR+9npIeblyxUC3TxjoSPM8QvjIvBiPllOPb2Y0ltv+1ixe1/'),
			
			this.addEntry(dt + 'snackbar', function()
			{
				var bg1 = new mxCell('Archived', new mxGeometry(0, 0, 358, 48), 'shape=rect;strokeColor=none;fillColor=#333333;fontColor=#FFFFFF;align=left;spacing=16;fontSize=13;spacingLeft=8;whiteSpace=wrap;html=1;');
				bg1.vertex = true;
				var text1 = new mxCell('UNDO', new mxGeometry(1, 0, 88, 48), 'text;verticalAlign=middle;align=center;fontColor=#EEFF41;fontSize=14;resizeHeight=1;whiteSpace=wrap;html=1;');
				text1.geometry.relative = true;
				text1.geometry.offset = new mxPoint(-88, 0);
				text1.vertex = true;
				bg1.insert(text1);
			   	return sb.createVertexTemplateFromCells([bg1], 358, 48, 'Snackbar');
			})
   		];
		  
		this.addPalette('gmdlMisc', 'GMDL / Misc', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLPickersPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library picker ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'date picker portrait', 328, 484, 'Date picker (portrait)',
				'7Zzfc5pAEMf/Gh/TueMQ4THVJA9tms4kM3mmegpTFAcvMfav752cii4matkz7lQnGdn7hfth0f2y0hLd8dtdEU+T+3wgs5a4aYlukeeqfDV+68osa3ksHbREr+V5TP+1vNs9rXzZyqZxISfqkAFeOeA1zl5kaSkNM7XIrGGWxFPzspB9PeXXYZpl3TzLi2WrGC4f2j5TRf5bVlrk8mFakniQz7WR6w27niyUfNu7z0uT3eE7mY+lKha6yzwdqKTsIbywHJbIdJTYYX7ol8Z4VhpG67EbF+gX1gv1HhHAI0/JS8vT49j1tND/uTjSRYxFQRgaez5RH7tukk+M1+IsHU30ZiaHZs7ZNO6nk5HxYmCnekz/mEWF0NvGoWk/zq7tqF+5UvlYNxRyprs9W88ZAvMkVfJRT2cGz/WRp22JGme22S70lGt7j20MX+2MvavgUIzeaRijoLQVMotV+iq35v8XtD5Aq2l2AE39llSNS8fpYGC67GK8XT52PRe8y4y39bZZ58F0UQtt6rBTaB3EQZwYTgyJQ7vmpBNkav12Tmfh98zzOBYeq0RbXztNFrUkGjrk/SY8bVf4mad6YY8ttgNnNSIfDmdSATLr/ToIVgBg6dNgano0ETynAOOiDtiyg90PjhZKe/jaAewL9wP78VBBrsPrsph36gJ0RDlA1wDDtugAgJcWsyHg93g0uNoAq5AMmXm6DrQqlAgNio5iBCoRoHJPhMr7p7+VMy8GFGeA1BM1Ul64OvNcNCkOSD1TI+V7UUSAFFQayMVUu8M4AVJQAbmlRqrDmU+AFBQ0qHzPq3wfZzWfU5f21Y9DyYM3TmqdW32OVNg5uRCFHNQ/PKLk3GBaK0rNYoKSBZTpaWA6W7KFRA6KFT51cq6TLyRyUNBoUyfnOhnDIedBgSOgTs51coZEDgoex1+D+Yjc1gXr85NznawhkYMCSEg95lynAEjkoCASESXnCFOAggmqISshnxyn8+UAOOhq5BHy+ojzJAAHHdRHVlI/XXTOswAcdFAzeae2UY9NpzMDa195Y20Z48nI19WRu8hdAA585kHArHnAdsWrVUaGCxxKLZy81uI8e8BBB7UWTl5scZ4+oKATUGzhVNUWN5wEQ+EEpZUT6lsvg9PZ8gckdFBb4eTFFdf5AxI6KK5wqurK2fIHJHR1v6ehjs71ZQQkdFBwoV+Q4joTQEJXU5BCXnBxnQkgoYOCC9kqFUecUKr1BNRJ6NekOM8EcNBBnYR+UYrzTAAFnQ91EvpVKc4zARx0UDpBKEv5ZOicZwI46KB0Qr8uxXkmgIMOSidkC1POlwngoIPSiaAqnTjihPLrDx/qJN3rH92b7/tY7d6mYl9lJbjLTh2AzS0R2NGHQRV3szFoByy2tiqQOzWXydsNXSbnwfZ18qvVxM1ShxLLw7f/xPcSjxCJRwjA9ebmDmtl9+oN2P4C'),
			this.addDataEntry(dt + 'date picker portrait dark', 328, 484, 'Date picker (portrait, dark)',
				'7Zxbc5pAFMc/DY/p7LKI+piYy0ObpjPJTJ+prsIUxcHNxX767sKK6MFULWetJyUTB/aK5+fBs38OemIwfbvLo3l8n41k6okbTwzyLFPl3vRtINPU81ky8sS15/tM/3v+7Y5aXtSyeZTLmdqng192eInSZ1mWlAULtUxtwSKO5mY3l0M95NU4SdNBlmZ5USsC3/zp8oXKs5+yViOLzdTE0Sh71YVcH9j5ZK7k285zLorsCd/JbCpVvtRNXpORissWwu+V3WKZTGLbLegFZWG0KAsmVd+1CfSOtUKzRQSwyFP87Pm6H7uc5/qViwNN1Ck2U57NVK18XGzAdLNsZqwWpclkpg9TOTZjLubRMJlNjBVDO9Rj8stMKoQ+NgZNhlF6aXv9yJTKproilwvd7Lu1nCHwGidKPurhTOdX/cnTZbGaprbaTnRlB7i+CPel5h9HrR+WZblMI5W8yI3x/4ZkAEhqeF0AT78l1WDBaTIamSbb1G6LbW2op0wb8Dp8FxE39M08D6aJWuqiLjsGzl4cxJHew5A4dBquMWGqqrdzPIu1B+3Pwmc15xpqo8m8kURLH/mgDUvbGb5liZ7YZ8tNx1n1yMbjhVSATHVee8EKASx91UtMizac5xhgXDQBKxrY8+BorrSDr+3APvEgtN8GNeTavc6LebfJQSeUHbQC2OuILgB4bj7bA/weDwbX6GA1ksNic+1odSh9NCjaixGo9AGVeyJU3r/8rYx5NqA4A6SeqJHye6srz1mT4oDUd2qkAr/fJ0AKCgvkfKrTZZwAKSh43FIj1eUsIEAKChpU4rxaPM4avqfOLfTjUPLgrZOq1lYfhFQPhRTUO3wipNxgqRSjdrFASQKq7ueJ5WSLJyRSUHwIqJFyvXhCIgUFiQ41Uq4XTzikfChIhNRIuV48IZGCgsTh90j+RKrHBleD4MMsnpBIQUGiR82nXIfkSKSgINEnQsoRlhAFC1QfVsL52XM5XUyOg6pBfiCnPzgPynFQQf1hJZ3TQeU8KsdBBTWJd1IBdd9kvjBwtrIBq2iuMevvaMRVHuZ2YowLwGHAfAiYtQ/YznixWiHhAofSBienbTiP7nFQQW2DkxM3nIf3KKgEFDc4FXXDDRfBULhAKeOIfM9/k8vJ4nskVFDL4OTEDNfxPRIqKGZwKmrGyeJ7JFRNz4tQQ+VadkdCBQUOegkWriNzJFQNCRbkBA7XkTkSKihwkMm6cMQFJZtMQB2CXo6F88gcBxXUIeglWTiPzFFQBVCHoJdl4Twyx0EFpQmENIuPFpnjoILSBL08C+eROQ4qKE2QSbQ4XWSOgwpKE4KKNOGIC8rTAwHUIQaXXwc3X3ax2f5Zg12ZfhuPy7MdANaP0LODsdfvELfrc7bDcuOoBrnbcFu409JtYR5u3he+WA3cLnUoaTx8/k98J/E+IvE+AnB9uP4BrrJ5/fe5fgM='),
			this.addDataEntry(dt + 'date picker landscape', 512, 304, 'Date picker (landscape)',
				'7Zxdb5swFIZ/DZed/AEELrv042LrOqmVds0SJ6CREIHbNPv1s4OTJjmmKSl2i7tElbCxgZ4HG96XEzw6nD1dl8kivSnGLPfopUeHZVHwemn2NGR57hGUjT164RGCxJ9HrhrW4vVatEhKNuev6UDqDo9J/sDqmrqi4qtcVVRpspCLJRuJTX6dZHk+LPKiXK+lk/VH1Fe8LP6wnTVs/ZFr0mRcLEUlFgW1P1Zy9tR4zOsqdcDXrJgxXq5Ek2U25mndIsDqQFOWTVPVjSK/rkyqumK67fscArGgoqCPCAURuU8fPCL6hbn8/3+XYmkql84XYhFh2jJiCMVhFMn6Ys6PR3JezGUQkzybzkUxZxO5zWqRjLL5VAY1VJu6y/7KnVIqyjK+2SjJz1UvXiyeO93LwgX2Rc0yzTi7E9Wy51KchaIu5bO8DSxyFBYOI0OwfABLABkAIOLwuSYqs2w8lk0OSVytP4cBC18MOw5EWe7nVjbhK1E1QKKqZJVo8EsFA3cUc3pazP16MkAlyxOePbK97b+FQ6CZRurh8lYW/oX8tmNB0M6AGYmgsVJL4i2nt+qAvlASqqlod3pCFoMfguCLmSmTLboYDKcAwFQHYN1AHQc2NjSO8fJJPAC8iK+5nBgDNtCNlumnGC0x2lxg32u0RCD4d62jrj21dzBESH7f7RTXT0m6GybSMshqpz+LTBwLQSu1mXC/RzGZVIwDKNtDfRWnGHC6cY2TdirydfdKH5gTRgDUvWugAjGz9h8UBqB+uQYqxAM48/UOFBTlzo2oAUZx/0FBr+DKNVAR8h24RkGfwLmbviiO4DWqbzd9GBoJuHNQW5H0MQSpFpwfGwO3MYa6BQdNCOI6OK3MMggOI2SCHHQjoKPtGDm98Ar7Rg5aGb7r5PRKrHfkoLkRuE5OL836Ro5AtyN0nZxeq/WOHLQ/2j8bOUZu79nu+5PTi7fekYN+SOT6mLMtCgyRgwZJ7Do566pgs51uyUHHZGP0u4vOuiwwg07joThvoljXBWbQQRdl8zDAXXTWhYEZdNBGeSEzUPTNFpWE1ZQcqE0CPBn5NrfwELkV/RAEgO+GQZd81Q7PNl6kWd7QfMHOuy/W9YQZdNB9wc7bL9YFhRF0FNov2Hn/xbqiCH0T6KD/ckJyas/QWVcUZtARiM55B8a6ojCDDjow2HkLxrqiMINO9+MW19FZf9ZgBh20YD5BHottcWAGnSaRhTiPzrY4MIMOWjDup7JYFwexibw/Ct0U93NZrIsDM+igm+J+Mot1cWAEnQ/dFPezWayLAzPooJtiIJ3lg6GzLg7MoINuyifIZ7EtDsygg26K+wkt1sWBGXTQTaHOuym2xcF2IusWHXRThuc/hpffm/AdvomiKUlz7yUJqIHJ84sTUOszY/cM6Jat6rDaK+1AHmheqRC0faVC4/N1tLf3s8BE7qAPjZjbb/+JNxKPDRKPDQAXxefXnNXNd9+C9g8='),
			this.addDataEntry(dt + 'date picker landscape dark', 512, 304, 'Date picker (landscape, dark)',
				'7Zldb5swFIZ/DZed/AEkXCa068XatVon7XJCwQlWTYzAa5L9+tlgEsCmSdXBVLRUlfDBBzvPax9zThwcpvvbPMqSex4T5uAbB4c556K6SvchYcxBgMYOvnYQAvLfQZ977sLyLsiinGzFJQ6ocniJ2C9SWSpDIQ5MG4okytRlTlbykcs1ZSzkjOflXewi9Sfthcj5M6nvbPmWKGMSxXwn21A2oiIrH3G9pnsix1/qsUkuyL53/qVJT/6W8JSI/CC77GgskqqHB/WkE0I3iXbDwK2MUVEZNkffEw55oYnY6WCDDnbwAoM3MvLKj7LzrWjY1+Wnj13E6GYrmyuJguSqVxat6HYjTUA/64n+VqN6ir/CSFcRW2i3lMYxIye3JReCp6q3ezLekbXiBX1p2iVUkCdpV4/cyRUpbYlImVbvIrHQWbGgPx9ILNcQa3FvCCUnL16DZUDvk6yBH87qth5HyaMGelCQxUFaZqAN08b6IsDYDvigHVy/cjkH3AXv5+0ZvB9H5D0CzBkYD6Z/eRyWjjQryCthxhpOBtze2gEhDacGaC7G4y5t8jsa3wNwZgnVXYJxVCTq4Ck3aI0z3W/U6ftpk8bsk6Ap+ZnR1XO1Ftt85yBchq7Bt3nn7DrPq6/dXeYd6X5oYugUqb9pXkFnL3id2NO3Id4qtf+q1BCCttTAsleANdK/X+q5ITUcJ+54o2wjuRhabLGJ1g2GiUKBQdYMQx+ZbIBaZH08Gtl6vzTQutNC67YDgmdZtf5AbKHB1psUW69zrs7Ng3UwtmaC6E+KLWwHW2Q5yAZja6aXsymxRTP479atmQ3OJ8UW++fj7VBnmZn5BZNiizrrtn6RHYOtmQhCs9z0keHi9mFmewcbKiaYOSKcVObQDbi2zGEotpakbFq5Q+dFwVLcGIytmZaFi6/hzV0f3yYdbFI81TGq0sJ3LnGVNREbxnbV+W3SNYsSf1eOToQ2tKhrd00t6iMyJywS9KVdO7AJpEd/5FRO6jj0FfTbxY8rryMyX68LIgyJj9/iItWRmTE+fPmveK/iwYCKBwMILpunn/mq7s1fAf8A'),
			this.addDataEntry(dt + 'time picker', 328, 484, 'Time picker',
				'7Zldb5swFIZ/DZetMObzMk26Xqxdq3XSLicUnGDVxAi8Jtmvnx2c8HGgSVdAKlqiSPiYY8PzHh84joHnye4uC9P4gUeEGfjWwPOMc1EcJbs5YcywTBoZeGFYlil/hvWloxcdes00zMhGXOJgFQ6vIftNCkthyMWeaUMeh6k6zMhSDnmzoozNOePZoRevDh9pz0XGX0ilhxw+qicOI76VRiQbYZ4exlms6I7Ii7jRF0AyQXadN3Ew6Tu4IzwhItvLU7Y0EnFxBrb8wi0mdB1rN9u3C2OYF4b1ybdkIg80lnZEGCDCBp5h852gTDNwfV/Z+UacB7jhG8UuZHS9kc2lREEydVYaLulmLU2mHuuZ/lGzOmpshZEuQzbTbgmNIkZKtxsuBE+UFGZpvCcrxQvb0rSNqSDP0q6G3MqwlLZYJEyrd5FY1r+JFbgf18oGWs0egE7y2sVbrADzLsUq9JF3bOt5FF810aNiLPbS4pk98cXtfLWDDPrCZa8H0M0KfttsWSrmx+k7gP7TiPTHR2tbo6F1L8/T0pGmOYEZqEzIbZnmI0v76ODWI++YIyt8Tqu8CqiXpe+1pOkmoijMY/XQOazOI69kt1aP3+t1ErFrQRPyK6XLlyL0OlI4eNades6GdVbc9pmnwE9NzCqz9HfNC+FG7Ds9xb77tra2UxfXgnnldE7f0e8DbVHvecVeqO9AbN9eN5Zp1tnaHkwswTBoA4AWZpbPjNZu5KQA5qSh0CITsLWnzBajALJtSfe9sEWArTMpto2UgF13PLawKHSnxBbZDbY+Ho8trCa9KbH16m/Io4YtLP78KaHF+Hy2HepJBiu7YEpoUf3d1nJaauah0MLKDsGtpU/MthG2rS9gQ2UEWBOiSRUOjWzbWjcMxbalJptU5dB8S0DYHg8urMrms2/z2/suwFU8GGIsNy6KvYQfXPJadO1H1reY36fdcfsT9a9HXQ2ghdey8+ZoW0ZYKOhrfe+gTSA9+xOn8qJOU18htx4LV05DZL5a5UQAiU93cZHqFqwXH7/+V7xT8WBAxYMBBJfN8o+94vTq/35/AQ=='),
			this.addDataEntry(dt + 'time picker dark', 328, 484, 'Time picker (dark)',
				'7Zldb5swFIZ/DZet8AdflwnterF2rdZJu5xQcIJVEyPwmmS/fnZwEsCQpisgFS1VJXzsY5PnPT5wHAuF6fYuj7LkgceEWejWQmHOuSiv0m1IGLOgTWML3VgQ2vLfgl86esG+186inKzFJQ6wdHiN2G9SWkpDIXZMG4okytRlThZyyvmSMhZyxvN9L8JQ/Ul7IXL+Qg49a74myphEMd/INpCNqMj2U9ws6ZbI9ed6bZILsu28/71J3/wd4SkR+U4O2dBYJOUIBP3SLSF0lWg37OPSGBWlYXX0PeGQF5pIOx1k0EEWmiH7nYyc/UfZ+VpU7Mv9p4tdxOhqLZsLiYLkalQWLeh6JU22nuuZ/lGrOr5sK4x0EbGZdktpHDNycptzIXiqpLBPxnuyVLwQlqZNQgV5lnY15UZGpLQlImVavYvEgv8mVuB+XCtsaDV7MHSS9y7OsTKYdylWoQ+8Q1uvo/iqhR4VY7GTFs/uiS9q56sdZNCXLjs9gW5W8GO7ZavYH6fvGPSfRqQ/PloMR0PrXp6ipSPNCnImA7Vmmo9s7YODW4+8Q46s8Dnu8iqgXra+15Kmm4jiqEjUQ2e/Ow+80u1KPXmvV2nMrgVNya+MLl7K0KsD9O1wHmIDYLXnzbDOy6/9xlPgpyYGT1n6u+YFUCP2nZ5i3z2vLXbq4kIzrxzH9B39vqEtGCev9MX2/L6Btl1niz0zsQTDoA0MtGZm+cxocSMnBWZOGgotsA22eMpsEQhMti3pvhe2wGDrTIptIyUg1x2PrVkPulNiC3CDrY/GY2tWk96U2Hr1N+RRw9Ys/vwpoUXo7Ww71JPMrOyCKaEF9Xdb6LTUzEOhNSs7YB4tfWK2jbBtfQEbKiOYNSGYVOHQyLatdcNQbFtqsklVDs23BIDweHDNqiycfQtv77sAV/EgE+Pp4KI8S/jBJa+brvPI+hHz+7Q7HH+C/vWoq2Fo4bWcvDnalhMWCfpaPztoE0iv/sSpvKnj0lfArcfCldMQmS+XBRGGxMdvcZHq0KwXH7/+V7xT8WBAxYMBBJfN02965fDqT35/AQ=='),
			this.addDataEntry(dt + 'time picker landscape light', 512, 304, 'Time picker (landscape, light)',
				'7Zldb5swFIZ/DZet/AEkXOaj68XatVon7XJCwQlWTYzAa5L9+tlgEsCmSZWQqWiJIsExB5vntc/hOA6eJdv7LEzjRx4R5uA7B88yzkV5lGxnhDEHARo5eO4gBOTPQV86WmHRCtIwI2txigMqHd5C9puUltKQix3ThjwOU3WYkYW85XRJGZtxxrOiFS+Lj7TnIuOvpNZCio9qicOIb6QRypMwT4v7zJd0S+QgpnoAJBNk2/kQhUk/wT3hCRHZTl6yoZGIyys8qEceE7qKtRsGbmkM89Kw2vsemMgDjcWOCBuIsIMnGHwQFACBPx4rO1+L4wDXfK3YhYyu1vJ0IVGQTF2Vhgu6XkkT0Pd6oX9Ur54ENFUY6SJkE+2W0Chi5OA25ULwRDb44GB8IEvFC/rStImpIC/Srm65kdNS2mKRMK3eSWKho2JBf9yTWK4h1uTREEoOXrwHy4DeJVkNPxxV57ofBVh19KQgi520jMCFAGM74J12cP3S5RhwF5zP2zN4P1+R9xVgjsD1YPqnB2PpSNOcmGHmEHVt4eSc9asdENJPXxEyZ9t+GdYB7Y3nEBpZYnEbURTmscosxQqseCXblcqxt6skYreCJuRXShev5WTriNNGQtu3HJ3IWfnYR0L9T00MHULxd80raE12rxVc4IUmv/+u1BCCptTAshiANZSfL/XYkBpePLC4c/W1sO4xDWoH7HkNtthE6wb9hJnAIGvGmc9MNkANsj6+GtlqvdTQusNC6zYDgmeZtX5PbKHB1hsUW6+VV8dmYu2NrVkG+oNiC5vBFlkSWW9szfpxNCS2aAT/3bw1y73xoNhi/3i87SuXmaVdMCi2qDVvqxfZa7A1Kz1o7id9Zri4mcxs72B9xQSzRoSDqhzaAddWOfTF1lKUDat2aL0oWDY3emNrlmWzybfZ3UMX3zodbFI87GOUWws/uMQ179qCbG4rf0y6+qbEZeVoRWhDi2pzrq5FlSIzwkJB35p7BzaBdO/PnMpB7bu+gX5z8+PGa4nMl8ucCEPi/VOcpDoyK8anr/8V71Q86FHxoAfB5enhz7zy8vp/fX8B'),
			this.addDataEntry(dt + 'time picker landscape dark', 512, 304, 'Time picker (landscape, dark)',
				'7Zldb5swFIZ/DZet/AEkXCa068XatVon7XJCwQlWTYzAa5L9+tlgEsCmSZWSqWiJIsExB5vnPT7mOA4O0+1dHmXJA48Jc/Ctg8Occ1EdpduQMOYgQGMH3zgIAflz0JeeVli2gizKyVqc4oAqh9eI/SaVpTIUYse0oUiiTB3mZCFvOV9SxkLOeF62Yhepr7QXIucvpG5Z8zVRxiSK+UaeQ3kSFVl5i5sl3RLZ/1z3TXJBtr3jL0168HeEp0TkO3nJhsYiqa7woB50Qugq0W4YuJUxKirDau97wCEPNBE7HWzQwQ6eYfBORl75UXa+Fg37svz0sYsYXa3l6UKiILm6KosWdL2SJqDv9Uz/qF49xV9hpIuIzbRbSuOYkYPbnAvBU3W1ezDek6XiBX1p2iRUkGdpV7fcyIiUtkSkTKt3kljoqFjQnw4klmuINXswhJKDF2/BMqD3SdbADyf1ue5HyaM6elSQxU5aJuCDAGM74J12cP3K5RhwF5zP2zN4P12Q9wVgTsDlYPqn52HpSLOCvJFmrOnknPmrHRDST18TMqNtPw2bgPbGcwhNLLm4iyiOikStLOUMrHml25VaXq9XacyuBU3Jr4wuXqpgawOcgnAeugbAZsvRQM6rx+7GcUebn5oYOqTi75pX0Al2r5Nc4AcFv/+m1BCCttTAMhmANZWfL/XUkBpeJrF4wy6D2kEGQ4stNtG6wTBpJjDImnnmM5MNUIusjy9Gtp4vDbTuuNC67YTgWaLWH4gtNNh6o2LrddbVqbmwDsbWrAD9UbGF7WSLLAvZYGzN+nEyJrZoAv9d3Jrl3nRUbLF/PN8OtZaZpV0wKraoE7f1i+wl2JqVHjT3kz4zXNxezGzvYEPlBLNGhKOqHLoJ11Y5DMXWUpSNq3bovChYNjcGY2uWZeHsW3h738e3SQebFA/7GNXWwg8ucd30bUG2t5XfJ11zU+Jj5ehkaEOLenOuqUW9ROaERYK+tvcObALp3p84lYPad30F/fbmx5XXEZkvlwURhsT7pzhJdWRWjI9f/yveq3gwoOLBAILL08P/eNXlzb/5/gI='),
			this.addDataEntry(dt + 'year picker light', 328, 484, 'Year picker (light)',
				'7ZhNb6MwEIZ/DcdK/iAEjlnS9rAfXSmV9swGJ1g1ODJuk+yv3zG4SSimLUmQeoAokT32eMz72JrYHo3z3b1KNtlPmTLh0VuPxkpKXZfyXcyE8AjiqUfnHiEIvh6562jFVSvaJIoV+jMOpHZ4ScQzqy21odR7YQ1llmxMUbElDPltxYWIpZCqaqWr6gF7qZV8YictrHpMS5akcgtGDBUbjynNdp1zrkx2wvdM5kyrPXTZ8lRndQ9KwtotY3ydWTc/9GtjUtaG9cH3KAEUrApuRWhLkcfs2SPgh2YbBb+Y9pQIoSgIQ2OXhf5YukIWRrVE8HUBVcFWZsxykyx5sTYqBnaoBf9nglIKdSMoXyZiZr3+Sq1lDg2KldDtj1XOENhmXLMFDGect7DywJbpXPQBRM4DFAW1TTGRaP7CGuNfAs1vQQNO0xYneCXtECvnaWq6vAV0Vz1H8R8laDUP3qWBJ1A3cR5MF70H0xQNxoGeuVHQQBwmLg5+bw6va38JL8pUG4w/Nx+H8F9qtfthT5VtiN+SQ2SC9s1N8+ohV6uS6RaVw8Q+BSpwgZqMoC4BhX1/AFJTF6lgJHURqYgMQCq8ThL6iFTj74QlRaKvRmrSN9W7SR1S1VVJRS5S4binLiI1SJ7CyIUqGlFdgooOkqgwdqCyx88R1bmoBslUuH3sj2e/4tsfXbBOpabvpKTGQQl1EDgenlDvdbCwU8PXI9l02DdqJ5SnyJHk+p6j3kC2oW9wgBrRbyZDZD3cvtp4+D4S7yQeDUg8GgA4VI8Xh3X303vF/w=='),
			this.addDataEntry(dt + 'year picker dark', 328, 484, 'Year picker (dark)',
				'7Zhdb5swFIZ/DZeV/EEIXKa068U+OimVds2CCdYMjozbJPv1O46dDwKkJSlbJ4UoCL/2sc37YB3ZHo2L1YNKFvlXmTLh0XuPxkpKbZ+KVcyE8AjiqUfvPEIQ/D3yqaMWb2rRIlGs1G8JIDbgJRHPzCpWqPRaOKHKk4V5VGwGXd5mXIhYCqk2tdQn5gd6pZX8xbY1pSyZEfMklUsoYyi4oZjSbNU53Y3k5vrAZMG0WkOTJU91bltQEtqwnPF57sL80LdiUllhvovdvz08OAPazaANM57yZ49AHJosFNwx7enOaHMZXZb6QM82V5drieDzEoqCZabPapHMeDk3Lgauqyn/bQalFMrGUD5LxMRF/ZRaywIqwGb9aGL1GuQxAkmxCiJ/ODMNlGXONZtCK9PfEr5D0HJdiD7MyHnMosBqiolE8xdW6/8Sjn6DI6AbN9AZf1r8K3iamibdzCyPJwle3QUnAeEt+7/CgZ65dtBAHEZtHPzeHLbLYQYvytQJMMfGf6iv3Q97uuyG+C45jEzQur5othEyyyqmG1R2E3sTqKAN1OhfgjqA0sbsPwCFfX8AUuM2UsGV1EWkIjIAqfB9ktBrpEIU38Z+nRSJPhqpUd9U305ql6relVTURiq8rqmLSA2SpzBqQxVdUV2Cig6SqDBuQeU2o1dU56IaJFPh5iFAPPkW33/pgnVoNT2RkmobJdRh+37zhHp/B1M3tSO6l5CsB6xrpQPKY9SS5Pruo44gu6FvcIBqo9+Mhsh6uHna8fj5SryTeDQg8WgA4FDcHyPa5oenjH8A'),
			this.addDataEntry(dt + 'date picker landscape light', 512, 304, 'Date picker (landscape, light)',
				'7Zhdb5swFIZ/DZed/AEELjPS9mLtOimVds2CE6w5GBm3SfbrdwzOBwGapoWLSjiKZL/2sc372CG2Q6P19l7FefooEyYceuvQSEmpq9x6GzEhHIJ44tCZQwiCr0PuOmpxWYvyWLFMvyeAVAGvsXhhlVIJhd4JKxRpnJusYgvo8vuSCxFJIVVZS5dlAr3QSv5lJzWsTKYmjRO5ARFDwY7HlGbbzjmXkp3wPZNrptUOmmx4otOqhYftRFPGV6kNo8itxLiohNUh9mgBZKwL7Y7QhiPP6YtDIM4X5vn/KMitTG6aQxZheqVjCIV+EBhdZvqyk5nMjImx4KsMioItTZ9FHi94tjKm+rarOf9nBqUUysZfvojF1EZpmR+Dnk1hhl1QNinXbA6yidzAKgQt1WtxDSxyERb2g4FguQ1YAGTSAALT1y2urHmSmCbnJO7KdG6Y/6bt2IOyGefJNNE7kCYIJMUKaPDbmoF78px+zHO3+jFAiolY81dW6/8zHLw2Du7VHPaLfAEPylQTjDsznxbjh3G5Y2XbAPSNksBGnRhPXbdlsfsDGe+3Ge+Nxn/YeDvqL8lhMgTt6t3sI+RyWTDdAHWY67vYTdrY+SO7ntlNyADsgn5ePJfY1f4rWHYk/ALs9ton2WEUDAAvbIMXjBuv542HvSF2HkZt9MKRXt/0giG2HsYt9OwZdaTXH73D0ahfes3rgmj6M7p96OJ36j594/VWO2ihDijHwxe6emnM7dRw73BtwK5WOqE8QU3I3rXnsDPIdugb7KPa6Df7jvul3rwSefoxEu8kHg5IPBwAOBSPF45V89P7yP8='),
			this.addDataEntry(dt + 'date picker landscape dark', 512, 304, 'Date picker (landscape, dark)',
				'7Zhbj6MgGIZ/jZez4aDWXnacw8UeZpNOstdupZUsikFm2u6v3w+lrVbtTGf0YhNpmsALH+D7gAYcGqa7RxXlyXcZM+HQe4eGSkpd5dJdyIRwCOKxQ+8cQhD8HfLQU4vLWpRHimX6PQGkCniNxAurlEoo9F5YoUii3GQVW0GXt2suRCiFVGUtdYn5gV5oJf+wWg0rk6lJolhuQcRQsOMxpdmud86lZCf8yGTKtNpDky2PdVK18LCdaML4JrFhFLmVGBWVsDnGniyAjHWh2xHacuQ5eXEIxPnCPP9vBbmNyS1yyCJMr3TMK5PRZaZr+rpMLSczmRkTI8E3GRQFW5s+izxa8WxjTPVtV0v+1wxKKZSNv3wViYWN0jI/BT2bwh12QdkmXLMlyCZyC6sQtESn4hpY5E1Y2A9GguW2YAGQWQsITF93uJLyODZNzkk8lOncMP+i7dgQNeM8mSZ6D9IMgaRYAQ1+WTPwQJ7Tj3nuVi8DpJiINH9ljf4/w8Hr4uBezeGwyFfwoExd2CLnxo/jcs/KtgHoCyWBjaoZT123Y7H7IxnvdxnvTcZ/2Hg76k/JYTIE7ZvdHCLkel0w3QJ1nOu72M262PkTu4HZzcgI7IJhPjxvsQtQeBu6TXZk/h+wO2ifZIdRMAK8eRe8YNp4A2887I2x8zDqojef6A1NLxhj62HcQc+eUSd6w9E7Ho2Gpde+LggXP8L7b3386u7TC5+3xkEL9UA5Hb7Q1UtjaaeGB4drA/aNUo3yDLUhe9eew84g26FvsI8ao98cOh6WevtK5OnrRLyX+HxE4vMRgEPxdOFYNa/fR/4D')
   		];
		  
		this.addPalette('gmdlPickers', 'GMDL / Pickers', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLSelectionControlsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;labelPosition=right;align=left;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library selection control ';
		var sb = this;
		
		var fns = [
			this.addEntry(dt + 'checkbox on hover light dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'checkbox;strokeColor=none;fillColor=#009587;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Checkbox (on, hover))');
			}),
			this.addEntry(dt + 'checkbox on focused pressed light dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#009587;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'checkbox;strokeColor=none;fillColor=#009587;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Checkbox (on, focused or pressed))');
			}),
			this.addEntry(dt + 'checkbox on disabled light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'checkbox;strokeColor=none;fillColor=#B0B0B0;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Checkbox (on, disabled, light))');
			}),
			this.addEntry(dt + 'checkbox on disabled focused light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#B0B0B0;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'checkbox;strokeColor=none;fillColor=#B0B0B0;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Checkbox (on, disabled, focused, light))');
			}),
			this.addEntry(dt + 'checkbox off hover light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'checkbox;strokeColor=#666666;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Checkbox (off, hover, light))');
			}),
			this.addEntry(dt + 'checkbox off focused pressed light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'checkbox;strokeColor=#666666;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Checkbox (off, focused or pressed, light))');
			}),
			this.addEntry(dt + 'checkbox off disabled light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'checkbox;strokeColor=#B0B0B0;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Checkbox (off, disabled, light))');
			}),
			this.addEntry(dt + 'checkbox off disabled focused light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'checkbox;strokeColor=#B0B0B0;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Checkbox (off, disabled, focused, light))');
			}),
			this.addEntry(dt + 'checkbox on disabled dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'checkbox;strokeColor=none;fillColor=#676767;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Checkbox (on, disabled, dark))');
			}),
			this.addEntry(dt + 'checkbox on disabled focused dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#B0B0B0;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'checkbox;strokeColor=none;fillColor=#676767;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Checkbox (on, disabled, focused, dark))');
			}),
			this.addEntry(dt + 'checkbox off hover dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'checkbox;strokeColor=#ffffff;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Checkbox (off, hover, dark))');
			}),
			this.addEntry(dt + 'checkbox off focused pressed dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'checkbox;strokeColor=#ffffff;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Checkbox (off, focused or pressed, dark))');
			}),
			this.addEntry(dt + 'checkbox off disabled dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'checkbox;strokeColor=#666666;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Checkbox (off, disabled, dark))');
			}),
			this.addEntry(dt + 'checkbox off disabled focused dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'checkbox;strokeColor=#666666;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Checkbox (off, disabled, focused, dark))');
			}),
			this.addEntry(dt + 'radio button on hover light dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'radiobutton;strokeColor=#009587;fillColor=#009587;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Radio button (on, hover))');
			}),
			this.addEntry(dt + 'radio button on focused pressed light dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#009587;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'radiobutton;strokeColor=#009587;fillColor=#009587;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Radio button (on, focused or pressed))');
			}),
			this.addEntry(dt + 'radio button on disabled light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'radiobutton;strokeColor=#B0B0B0;fillColor=#B0B0B0;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Radio button (on, disabled, light))');
			}),
			this.addEntry(dt + 'radio button on disabled focused light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#B0B0B0;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'radiobutton;strokeColor=#B0B0B0;fillColor=#B0B0B0;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Radio button (on, disabled, focused, light))');
			}),
			this.addEntry(dt + 'radio button off hover light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'radiobutton;strokeColor=#666666;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Radio button (off, hover, light))');
			}),
			this.addEntry(dt + 'radio button off focused pressed light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'radiobutton;strokeColor=#666666;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Radio button (off, focused or pressed, light))');
			}),
			this.addEntry(dt + 'radio button off disabled light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'radiobutton;strokeColor=#B0B0B0;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Radio button (off, disabled, light))');
			}),
			this.addEntry(dt + 'radio button off disabled focused light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'radiobutton;strokeColor=#B0B0B0;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Radio button (off, disabled, focused, light))');
			}),
			this.addEntry(dt + 'radio button on disabled dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'radiobutton;strokeColor=#676767;fillColor=#676767;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Radio button (on, disabled, dark))');
			}),
			this.addEntry(dt + 'radio button on disabled focused dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#B0B0B0;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'radiobutton;strokeColor=#676767;fillColor=#676767;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Radio button (on, disabled, focused, dark))');
			}),
			this.addEntry(dt + 'radio button off hover dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'radiobutton;strokeColor=#ffffff;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Radio button (off, hover, dark))');
			}),
			this.addEntry(dt + 'radio button off focused pressed dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'radiobutton;strokeColor=#ffffff;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Radio button (off, focused or pressed, dark))');
			}),
			this.addEntry(dt + 'radio button off disabled dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 16, 16), s2 + 'radiobutton;strokeColor=#666666;fillColor=none;strokeWidth=2;aspect=fixed;sketch=0;html=1;');
				bg1.vertex = true;
				return sb.createVertexTemplateFromCells([bg1], 16, 16, 'Radio button (off, disabled, dark))');
			}),
			this.addEntry(dt + 'radio button off disabled focused dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 48, 48), 'shape=ellipse;labelPosition=right;align=left;strokeColor=none;fillColor=#666666;opacity=10;sketch=0;html=1;');
				bg1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(16, 16, 16, 16), s2 + 'radiobutton;strokeColor=#666666;fillColor=none;strokeWidth=2;sketch=0;html=1;');
				part1.vertex = true;
				bg1.insert(part1);
				return sb.createVertexTemplateFromCells([bg1], 48, 48, 'Radio button (off, disabled, focused, dark))');
			}),
			this.addEntry(dt + 'switch on light', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 36, 20), s2 + 'switch;aspect=fixed;switchState=on;strokeColor=none;fillColor=#0E9D57;sketch=0;html=1;');
				bg1.vertex = true;
			   	return sb.createVertexTemplateFromCells([bg1], 36, 20, 'Switch (on, light)');
			}),
			this.addEntry(dt + 'switch on dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 36, 20), s2 + 'switch;aspect=fixed;switchState=on;strokeColor=none;fillColor=#80CBC4;sketch=0;html=1;');
				bg1.vertex = true;
			   	return sb.createVertexTemplateFromCells([bg1], 36, 20, 'Switch (on, dark)');
			}),
			this.addEntry(dt + 'switch off light dark', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 36, 20), s2 + 'switch;aspect=fixed;switchState=off;strokeColor=none;fillColor=#0E9D57;sketch=0;html=1;');
				bg1.vertex = true;
			   	return sb.createVertexTemplateFromCells([bg1], 36, 20, 'Switch (off)');
			})
   		];
		  
		this.addPalette('gmdlSelection Controls', 'GMDL / Selection Controls', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLSlidersPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library slider ';
		var sb = this;
		
		var fns = [
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=0;strokeColor=#bbbbbb;opacity=100;strokeWidth=2;handleSize=10;shadow=0;html=1;',
					200, 10, '', 'Slider (normal)', null, null, this.getTagsForStencil(gn, 'slider normal', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=50;strokeColor=#3F51B5;opacity=100;strokeWidth=2;fillColor=#3F51B5;handleSize=10;shadow=0;html=1;',
					200, 10, '', 'Slider (normal)', null, null, this.getTagsForStencil(gn, 'slider normal', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=100;strokeColor=#3F51B5;opacity=100;strokeWidth=2;fillColor=#3F51B5;handleSize=10;shadow=0;html=1;',
					200, 10, '', 'Slider (normal)', null, null, this.getTagsForStencil(gn, 'slider normal', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderFocused;barPos=0;strokeColor=#bbbbbb;opacity=100;strokeWidth=2;handleSize=30;shadow=0;html=1;',
					200, 30, '', 'Slider (focused)', null, null, this.getTagsForStencil(gn, 'slider focused', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderFocused;barPos=50;strokeColor=#3F51B5;opacity=100;strokeWidth=2;fillColor=#3F51B5;handleSize=30;shadow=0;html=1;',
					200, 30, '', 'Slider (focused)', null, null, this.getTagsForStencil(gn, 'slider focused', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderFocused;barPos=100;strokeColor=#3F51B5;opacity=100;strokeWidth=2;fillColor=#3F51B5;handleSize=30;shadow=0;html=1;',
					200, 30, '', 'Slider (focused)', null, null, this.getTagsForStencil(gn, 'slider focused', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=0;strokeColor=#bbbbbb;opacity=100;strokeWidth=2;handleSize=20;shadow=0;html=1;',
					200, 20, '', 'Slider (click)', null, null, this.getTagsForStencil(gn, 'slider click', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=50;strokeColor=#3F51B5;opacity=100;strokeWidth=2;fillColor=#3F51B5;handleSize=20;shadow=0;html=1;',
					200, 20, '', 'Slider (click)', null, null, this.getTagsForStencil(gn, 'slider click', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=100;strokeColor=#3F51B5;opacity=100;strokeWidth=2;fillColor=#3F51B5;handleSize=20;shadow=0;html=1;',
					200, 20, '', 'Slider (click)', null, null, this.getTagsForStencil(gn, 'slider click', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDisabled2;strokeColor=#b0b0b0;strokeWidth=2;fillColor=none;handleSize=6;shadow=0;hPos=0;html=1;',
					210, 20, '', 'Slider (disabled)', null, null, this.getTagsForStencil(gn, 'slider disabled', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDisabled2;strokeColor=#b0b0b0;strokeWidth=2;fillColor=#b0b0b0;handleSize=6;shadow=0;hPos=50;html=1;',
					210, 20, '', 'Slider (disabled)', null, null, this.getTagsForStencil(gn, 'slider disabled', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDisabled2;strokeColor=#b0b0b0;strokeWidth=2;fillColor=#b0b0b0;handleSize=6;shadow=0;hPos=100;html=1;',
					210, 20, '', 'Slider (disabled)', null, null, this.getTagsForStencil(gn, 'slider disabled', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=0;opacity=100;strokeWidth=2;fillColor=#000000;handleSize=10;shadow=0;html=1;',
					200, 10, '', 'Discrete slider (normal, light)', null, null, this.getTagsForStencil(gn, 'discrete slider normal light', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=60;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;html=1;',
					200, 10, '', 'Discrete slider (normal)', null, null, this.getTagsForStencil(gn, 'slider normal', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=100;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;html=1;',
					200, 10, '', 'Discrete slider (normal)', null, null, this.getTagsForStencil(gn, 'slider normal', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscrete;barPos=1;strokeColor=#BEBEBE;opacity=100;strokeWidth=2;fillColor=#BEBEBE;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (focused)', null, null, this.getTagsForStencil(gn, 'slider focused', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscrete;barPos=60;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (focused)', null, null, this.getTagsForStencil(gn, 'slider focused', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscrete;barPos=100;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (focused)', null, null, this.getTagsForStencil(gn, 'slider focused', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscreteDots;barPos=0;bright=1;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (click)', null, null, this.getTagsForStencil(gn, 'slider click', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscreteDots;barPos=60;bright=1;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (click, light)', null, null, this.getTagsForStencil(gn, 'slider click light', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscreteDots;barPos=100;bright=1;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (click, light)', null, null, this.getTagsForStencil(gn, 'slider click light', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDisabled2;strokeColor=#b0b0b0;strokeWidth=2;fillColor=#b0b0b0;handleSize=6;shadow=0;hPos=0;html=1;',
					200, 20, '', 'Discrete slider (disabled)', null, null, this.getTagsForStencil(gn, 'discrete slider disabled', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDisabled2;strokeColor=#b0b0b0;strokeWidth=2;fillColor=#b0b0b0;handleSize=6;shadow=0;hPos=50;html=1;',
					200, 20, '', 'Discrete slider (disabled)', null, null, this.getTagsForStencil(gn, 'discrete slider disabled', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDisabled2;strokeColor=#b0b0b0;strokeWidth=2;fillColor=#b0b0b0;handleSize=6;shadow=0;hPos=100;html=1;',
					200, 20, '', 'Discrete slider (disabled)', null, null, this.getTagsForStencil(gn, 'discrete slider disabled', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'slider2;barPos=0;strokeColor=#ffffff;opacity=100;strokeWidth=2;handleSize=10;shadow=0;html=1;',
					200, 10, '', 'Discrete slider (normal, dark)', null, null, this.getTagsForStencil(gn, 'discrete slider normal dark', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscreteDots;barPos=0;bright=0;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (click, dark)', null, null, this.getTagsForStencil(gn, 'discrete slider click dark', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscreteDots;barPos=60;bright=0;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (click, dark)', null, null, this.getTagsForStencil(gn, 'discrete slider click dark', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sliderDiscreteDots;barPos=100;bright=0;strokeColor=#0F9D58;opacity=100;strokeWidth=2;fillColor=#0F9D58;handleSize=10;shadow=0;fontSize=12;fontColor=#ffffff;html=1;',
					200, 45, '', 'Discrete slider (click, dark)', null, null, this.getTagsForStencil(gn, 'discrete slider click dark', dt).join(' '))
   		];
		  
		this.addPalette('gmdlSliders', 'GMDL / Sliders', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLSteppersPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library tab ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'stepper', 704, 478, 'Stepper',
				'7ZjtbpswFIavhv/GhoT8XFlaVWqzSd0uwC2HYNVgZLwmufsZMGmIoWWrkdqqWFHs4w/w+3CObTwS5/srScvsViTAPbL2SCyFUG0u38fAuYcRSzzy3cMY6Z+HL0dq/aYWlVRCoaZ0wG2HJ8r/QGtpDZU6cGOoMlrWWQkPesiLSknxCLHgQmpjIQpdd5EyzjuTh0naXNpuRgepYD/6hI3JPN4ViByUPOgmO5aorG2xREHbLQO2zUy3YBm1Rlq1hu2x7/OEdcbMeXj+xJq/PyqA7snKCiZqEOAovAxquyjUf2uDX9UGD0jT2SRwqthTf2ZDcpk7/BRM3xijfX+YQ7/YDSDStAJlqX18zEkAAgvAhuagLSJtKECp/8aZTH0pjYlyti10kUOqDJo7M6ivy5nKucm6ooPQbHjCxfx4wunxgbNG4oTVTJgoGtVlLcQZHu0E901yJ7M/pPJq4URm4vdkDueQeTFLGL5P6uRO5bBT9FRmf4WcyLxAfZmjGWReWjLHPza/rje/1y7kriN++lLEPwkvu4wpuCvpQ32PnV7+XfoCtikRN75wBgkv8QyUIpvSt028vnHB6MjijFGE6vQpGPkdlFkhrSxI4yHr3zZOK6jTZ9o4kW6ldkqgW/Ne3jq9fSEZ3zqdwKHN9dG3UDOB8i1Q5MtXRnwl6OKIWwT2OXfAV8apfPmK5SszgbIP5KNQ3t2BI3Si89l5g3T767forIvP35Ta5qefnP4C'),
			this.addDataEntry(dt + 'editable steps', 704, 72, 'Editable Steps',
				'5VfRbpswFP0aHhcZm5DkNcnal1aq1Ic9u3ABqwYj43bk72djk4ZBVqpgTdNAiXyP7cv1OfgAATmU7b2kdfEoUuAB+R6QgxRC2VbZHoDzACOWBuQYYIz0L8B3V3rDrhfVVEKl5kzAdsI75W9gEQs06sQd0BS0Nk0JiU65b5QUr3AQXEgNVqLSffuMcd5DASZZd2jcZQepoL1aYQe58u5BlKDkSQ/5yVJV2BEbFNlpBbC8cNM2rlTa2Dg/T/1Yr264JU8vn4yW/wzcrBOjhJY1ZXllyAClWJU3V6nRSVndwEx2Irxd30UGF5W6wFF3aJzTF+BPomGKicowbxe9p9zUQ44csk6Jmia6rIcuOobIZXx29YU6LlTJXXOWFPhTKfCEEj0mgVPF3mGQfkoed4UnwSpDdTtMcxqGfQKRZVqIkbrnMmcJHn1+v6e0KcAMN4T2CpdtbvboKi9TvoKU+dkJZJp+NwGt1gOCzvGFPCEay9NjN8rzbXj1PlxUnvV8O+KsGm84zfhLdy53w+/8MYpRPKCUhB4ojUeUHiRQBeY6xtxoqv9yKd7qhextB+b0Ym//lJ2R39T14mebJfwsKSB5ndpLZ/eyPT8cb3gu//Htfob9+dlQHi9+tv2v/CyKkX8/240oJZ6N62vP8L/qOet4699z+rvlj4+UGz8iHDTvjfdCqy0yp5dHRTj1brWUbju8uG46/PiOtMMvPzN/AQ=='),
			this.addDataEntry(dt + 'noneditable non editable steps', 704, 72, 'Non-editable Steps',
				'5VdNb5wwEP01HLMyNuzHdXebXFIpUg49OzCAFYORcVL239fGZgMFukQFVVVAu7LHnvHMe/az8Mgprx8kLbPvIgbukW8eOUkhlG3l9Qk49zBisUfOHsZI/zx8PzHqN6OopBIKNccBW4d3yt/AWqyhUhfuDFVGS9OUEOmQx0pJ8QonwYXUxkIUeuyYMM5bk4dJ0jza7qKDVFBPZtiYXHoPIHJQ8qKn/GSxyuyMHQqsWwYszZzbzqVKK9tPr64f9eqGK3m8fDIo/xm4qROjiOYlZWlhwAClWJFWk9DooKysYCY6Ad6H94Gxi0J17Kh5tJ3TF+BPomKKicIgb4s+Um7yIWcOScNESSOd1mPTO/vGM1M5N+250OOb0OMR5FubBE4Ve4de+DE63ApPghUG2rof5tLvtgFEkmjgB2xe05xFcHB7f8e0ysBMNwC2jOZ1as7kJs1jvokyiF4H5Hb3uR354WDDc+En4/A7B7QJewBd+x16fDykx0eL0HO37a1+F65ATzhffjgrhgdMc/DSvMtt+ANaDVGM+pASfwVItwNIpzFdRrc+p/b/VHLIbwysojm7AQMnCVSBWcdcJzTWf6kUb+Vf37WtaeIiuX1hGM9nt76/zgWCRg7UUnQStD6d+y+lUcG2D+kqGnUYQEoW0qgDmPe/1qhwu19/U7e75Y8itYw4zROhDld7ZN5VxMj31xOj8IAX5013P74F7fTup+Iv'),
			this.addDataEntry(dt + 'mobile step text', 358, 642, 'Mobile step (text)',
				'3Vhbc6IwFP41POokBAI+Vm37sJfZWTuz+7aTSrhMg2EgW3V//SYkoBSsWHHtFqcdc5JzEr6LhFholm7uc5LFX3hAmYVuLTTLORf6W7qZUcYsGySBheaWbQP5Z9l3B3ph2QsyktOV6JNg64Rnwn5THdGBQmyZCQSkiKkaDiw0LWKSqXhOl7L+NEwYm3HG83Ioms7VRw0TOX+iVc+Kr2TO1ExFc0E3B5dbhsxa7ylPqci3cshW947gGCLsYx95ng0xxADREUS6zDoJRKzHIdfXsZgmUWxKY8fcHCl0IKrr7xCSXwxI3YChFmBQrvcGgZNwIyyJVqqpV/cSR4SwN8eHcAz5SuwNvisvNTgjy2QVfTd37OxCDzyTAWhyF2aNoGonf1RTwoimOS1k64dBUmWs40TQhayjxqylUGUsFikz3b1ItbtJPUaY7ehYThkRyTNt1D+HROeNqk83kXLqOEoDNhY8+/VI8rPUjrqBaSYY7YOx29K5g9uowVNRM/N/44lcVj35aGI3ph95zQo8DAsqWqjXd9GLCLdFxCynRNCTzNRtkqajHNt375xOge9ZwAbH7aW9NJEBxW2yJOzGmFmontrajIZil/W5bM09+7qOcvF52tg2jTmoFvAQpsxyGlIJ05IWPZURlldf3N2juFfYNCx5JuybZpmKBXABFrwWCwtBMxmRtwV4KP/hwc0ZuupzzJzl8+mFOUF5DWROiK9rTscfxJz+JWThd5gTk1Shw0SJi5wVTG9mn96ROnB5dYghTYJALe+6etg2Ev6ROkYTfAF5TFry+Hr780GLohZKJGrAhpKHCV1QGdUO/cXmejBt+H12gHvagAAMr41qy1cXH1QcELzxyX7Cj0T9IGhL4f+zaFVnWBbgEPurR7J8alGyv4s6xIvOqHixex8HgFf9AcbVK8QrL0mwa0c20EuS15j9Iu9IsMcZTcWVzEyygr4rhj4+Qe0zoYMEdf6kXZMd76PRI5u741M9fP909S8='),
			this.addDataEntry(dt + 'mobile step dots', 358, 642, 'Mobile step (dots)',
				'7Vlbb9sgFP41fkwFxpfksUnaPuyiaZ20vU00xhcVB8tmbbJfPzDYsWOncRrcTm2JIoUDB/B3vg/DiYUW6eYmx1n8hQWEWujKQoucMa5+pZsFodSyQRJYaGnZNhBfy74+0ArLVpDhnKz5EAdbOTxg+ocoizIUfEu1IcBFTGR3YKF5EeNM2nOyEuPPw4TSBaMsL7ui+VJ+ZDees3tStazZWvjM9VQk52RzcLmlSa/1hrCU8HwrujwmAY9VD+ROlVtMkijWbp6jF44LZYhq393Tix8agH4wUAcMKNZyicBJmGCaRGtZVavbxwghz196hzAK2Zo3Ol+XRXbO8CpZR9/1Ezs70w+WCQPUvrd6jaCqJ39lFSJRz0khaj81ktLjMU44uRXjyD6PgoTCFvOU6uZBAbOfFzDbUbacUMyTB9Ia/5wgOs9kdLqJpAovojSgF5xlv+9wfhaTUT8wbYetFumFq+oN2Byvixo8FTU9/zeWiGXVk09mdmv6id8egYVhQXgH9fopBgXC7QRikRPMyUli6hdJW1GOPXWvnV6CNyRgg+PyUlqaCYOMbbLC9FKLmcuWWtqUhHzn9bmsLX37dRXleudxY9sWplEueCZEmeUkJAKmFSkGMiMsy1Dc3aO4V9i0JHkm7Jv2MFUUwAhR8Hui4OFUcpTyEiUxK5hfLj4Z12joys8xjZavqT2NemXpkWSaBIFc3tOqhN64qty2HI5p1Jka0ehk5o1Aj2mHHl+vfv1QpKiJEvEaMFP0aBx9jPCgOnjtnZmMMcEf8mJvMAECYJ4J1Zu8HtwoFWbH9+sqysIxyQoycB/AZTGDdN+hqefMZGZ/njiovUHDEWCH4AP3fdyrbWlU3OEH7p2N5SX4PiD98Dzc6zvBSLj3vNvNbOjte+Eox0DYzXO8d7ZD/wXIPiAz8c5gR/YLwN7NQ3RgP/d2A8rSe7sZFJL/6m5RjWM2CkYyAHd4dd8JSfOefyguyqOKiz04GX0gJVBrpUpyPZHGg305A0NpvPauNUoWD/YlDU7ctV4zQm8/QN1r+8EA9W5prxkd/62FR1R3f96p7s3/9v4B'),
			this.addDataEntry(dt + 'mobile step progress bar', 358, 642, 'Mobile step (progress bar)',
				'3Vhdb5swFP01PCYy5it5bJKmD/vQtFba3iY3GLBqYmS8Ntmvn40NgYQ0NHHUrUSR8PW99uWce2yD483zzR1HRfaFxZg63q3jzTljQt/lmzmm1IGAxI63cCAE8u/A5ZFet+oFBeJ4LYYEQB3wjOhvrC3aUIotNYYYlRlW7sDxZmWGCmXneCXHnyWE0jmjjFeu3myhfspNcPaE6541W8uYmZkKc4E3R9OtTCbXO8xyLPhWuryQWGTawwsmOizDJM1MWOibxFGpDWkTu3t6eWMA6AfDOwDDlbnceOBNmCBK0rVq6uz2MfK8MFqExzBK2Fq0nJfVpZwLtCLr9Lt5Yn9nemCFNLgm9t7kCOo2+aOarifbHJey9cMgqSJeMiLwvRxH+bzIIpS2TOTUdA8iDJ5HGPS1jWOKBHnGnfEvIdE/s6LzTapUOE7zmI4FK349In5RJXv9wHQDtkak40C3W7D54SFq7ltRM/N/Y0Sm1Uw+msLO9KOoOwJLkhKLA9SbpxhERHBAxJxjJPCbxNQvkq6ifDgJln5vgbckAMFpeWktTaVBcUtWiN4YMQvV00ib4kTsoj5XrUUE31dRQXhZbWy7wrRaC6ENURYcJ1jCtMLlwMpIqmso7sFJ3GtsOpK8EPZNd5iaBXAFFqIeFkKUqxqlokJJzgpmN/NP1jWaBOp3SqPVNrWn0bC6eiSZkzhW6b2uSje8riq3nYBTGvUnVjQ6moZXKI/JQXl8vf35oIuiKZRUNIDZKo/W0cdKHdQHr70zk7VKiIZs7K1KcAGwXwn1Tt4MbrUUpnbWa5ZKuZeznoNUe9vWPfWSoKiPN64aeBzZoaQ5Xb1y2nJd2LO2Azskhd3FfRRcgbI613Nf5Yas4qC6elfx/28Nrcexy4JrQzmPaPXUJ5nmPHOMl66U4OCXbnBCP3CAgPrORpZeV6KufK7xtlLL/zXiaq5kJClK/E8x9PEJOvw6c5Sg3iXtPdmJPho9srn7SKnd298w/wI='),
			this.addDataEntry(dt + 'editable steps optional', 704, 72, 'Editable Steps (with optional steps)',
				'5VfRkpsgFP0aHzeDkJjksUm6+9JOd2Yf+szGqzKLYpGkpl9fEExiNV07kel0qpMMHOByOQeOGpBtXj9JWmafRQw8IB8DspVCKFvK6y1wHmDE4oDsAoyR/gX48UZr2LSikkoo1JgB2A44Un4Ai1igUifugCqjpSlK2OuQm0pJ8QZbwYXUYCEK3bZJGOctFGCSNJfGXXSQCuqbGTaQS+8JRA5KnnSX7yxWme2xRHM7LAOWZm7Y0qVKK1tPz0Mv69UFt+Th5ZPe8l+Am3VitKd5SVlaGDJAKVak1U1qdFBWVjCSnTleLR7nBheFusJRc2mc01fgz6JiionCMG8XvaHc5EN2HJJGiZLudVqfmtouRC7ii8sv1PVM5dwVR0mB35UCDyjRYhI4VewInfBD8rgZngUrDNV1N8ypW20DiCTRQvTUPac5SvD5+/s9plUGprshtFU4r1NzRmdpHvMZxMzPSSDD9LsBaLboEHSuX8kTor48LXanPA/d2dvqpPIsxtsRZ0X/wGnGX5t7ug2/9scoRlGHUhJ6oDTqUbqVQBWYeYy50Vj/pVIcygBH3OzrmB11MVUNhxYyvtKRIfp2EG3DQ8V+aPSD7hCGZX1pNC56FuYCthJdQXa2L6UxPMrbWfXS7MTdZDTcSXESU16Dub2Y8j9lwuSXPenFhZdTuPA+g/3bkAOcPde2fHW84bH8R/e7MPbnwl15vLjw6r9y4XmE/Lvwukcp8Wxcf/bm8Vc9ZxGt/HtOu1t++yC889PHQePe06+0WiFze3lUhENvhFPptsaT66arl69f2/364/gn'),
			this.addDataEntry(dt + 'noneditable non editable steps optional', 704, 72, 'Non-editable Steps (with optional steps)',
				'5VdRk5owEP41POqERFAfq/bupZ3ezD30OScrZC4QGqKH/fXNEvCgaKVTmE6nMjrJl+yy++3yRTy2TctHzfPks4pAeuyjx7ZaKeNGabkFKT1KROSxnUcpsV+PPtxY9atVknMNmRliQJ3BicsjOMQBhTnLGigSnuNQw9663BRGq1fYKqm0BTOV2bXNQUjZQB5lh+pj8do7aAPlzQgrqA7vEVQKRp/tljcRmcTtWJKFM0tAxElttqxD5YWbxxfT93ztoE75evqsl/4zSMyTkj1Pcy7iDMkAY0QWFzepsU5FXsBAdhZ0FTwsEFeZaeGk+lhc8heQT6oQRqgMmXdJb7jEeNhOwqGqRM73NqxP1Wzno2ViUonjodTTu9TTK8w3mAbJjThBx/21ctR3eFIiQ2rLrptzd9o4UIeDJb5XzUuYgwq8uN/fES8SwO1IYFPRtIzxmZzHaSTn+wT2r73itvvcrXytaaND6WfX6a8NyDzoEHSZt8rj0355fDJKeWZh5+6zYILyBMPlR4qs/4DZGrxU13gNvyaTMUpJl1LmT0Bp2KP0Nqfj6Nbvqf1flRz2UwUm0ZxlrwJbDdwA3gePEx7Zn1irY+7RUKKSR+Jkh7GpOHQQcoyn0IXm8NtRuQ1Ny7egVnEbEB3M3moKP9gtmdIpxzidRbVeiO/gVn0/L9seXTRfcjyC0MpFZVN3gXWDtXAnhT/8B9FAN47H+8cgWj7X9/enORbJFZkYq0kZmb5JV/+V8i7CLqWTKO+6RykbSXnXgNc/rbxBuJq+qZtu+aX0jiNOw0SoVasVwWsSMfL96cQoWNPR62an72+4bnv7BfgH'),
			this.addDataEntry(dt + 'mobile vertical stepper', 358, 642, 'Mobile vertical stepper',
				'7VrZcpswFP0aHpMREov9mDjLdKZNO02Xx45ihNFULAW5sfv1lUAQsMDGAZw0U5g41tXqc+7RlQQGWoSb2xQnwYfYI8xA1wZapHHMi2/hZkEYMyCgnoGuDAiB+DPgTUeumeeCBKck4n0qwKLCb8zWpLAUhoxvmTJ4OAuILA4MdJkFOJH2lCxF+5c+ZWwRszjNiyI/v2QxnsY/SZkTxZGoc6m6Iiknm87h5iY11lsSh4SnW1HkkXo8KEoge1ZUCwhdBaqaY6mB46wwrKq6T79efFEAtIOBNDBMMZYLBI7CBDO6imSyGN0uRgg57pXThZEfR7xW+Ca/ZOEEL2m0+qx+sfVk+hInwmCquvdqjKBM0z8yaSKRTkkmUt8VkrLGY0A5uRftyDKPwgmFLeAhU9m9CIPPIwxahS0lDHP6mzTaH0Ki9UyPDjcrqcLzVeixcx4nPx5wOsiTUTswzQpbJdJzu0jXYLMcHTXzWNRU/59iKoZVdX42h43uz9xmC7HvZ4RrqFe/ohcRtkbEIiWYk6PE1C6SpqIsOLNvrFYHr0kAgsPyKrQ0FwbJLV1idqHEzGVOJW1GfP5U632eunLhyyrKdob5xrYpzFF9wRlDlElKfCJgWpKsp2dU8agX7vZB3EtsGpIcCPum2UzJApiABVdj4Z4wqTPRTyQ/ksSQVCET5Jg5jCvNiMxlBavzay2XJ6IAmudX3eSs5P/7dRjiVApP9O6Lj4gQT7CrmhQDLVotSmu+UNIvhk+TjBw7D+yoHOSXsDP8QNinOKOcxvUIvVfWORbjS7jNlY6Oie2uVDajXMkEcAJfmo2h6GVAlj81dvWFZDmlw774u3tjbxVt90RfE7ZIHYwTfZtSP7MnoGd+mJ6SEUZzMXlUhtxCGFGcShx0Xh7yezwVlIjWUUbjoIyaKywTTRHXyvHXcO4GepzZ7LiY9qomIneKicg0NQoWceTT1ToleWDDbCuWcpn47gsMIeABzcpg18FU38WnMu3Ej/o+zJwmeIAW3YxEmu2cgrQe5w6vdX6C7myKCQqCSSYo/UxjsNdLnD15j+jQbttmdySgHbAD9GwKoPVzh8XHuy/v7r5ejwG4jAb+vmhwmo1ntZZsBOxxdkA7NFlgii2Q2XIqcXG3uH4/BkkVGTskzYC83wRJVTiYliX9vAB1EnTcsmpO5P2WllXWbJL57OBhgVesqEJcmGQywiEps9YR5YNF1b3Aqs+NnrxPJi84P9niayJq9b279V9dHeqydx8sjUOBvj//RsmjpIDwdSJLRgLvdb7gzU4so5pk2hT178loGg6hvvfvJOrV7WEmOWOxy7g9Ls76Bl/DeegjpOqIWH+ENISFbaPCoQc41sDtTnmeaE0RNErQhx34PuAD571dvDzzHLjrdYLqIBj2OAlue+gz0nNYt9H7JI9hW95qODrYvyRDb5+gHm8s7J3SXpId963RI5JPb18VxesvZ/0F'),
			this.addDataEntry(dt + 'stepper alternative label placing', 404, 50, 'Stepper with alternative label placing',
				'1ZbdcsIgEIWfhvsEYtVLTatXveoTUFkNUxIyBK326bsk+JMhmXFGG62MupxlEb5wRghL8/3S8DJ71wIUYW+EpUZr20T5PgWlCI2kIOyVUBrhm9BFTzaus1HJDRT2mgLaFOy42kJrisoelFeqjJcuxEpZVhjN17qwH/LHiTHFfmWN/oJUK21QKnRRD5JKHSVCWUIno0Xiiy/0df1CnSu5KVBb4dIBk/MdGCtXXM18IpdCuDXNM5sr99MY+uXjSNj3Iqglv/8l6BysOeAQX8AmTcW3FDbzVJJGykBuMtvWeNX0N6eJzngx8IS7abOA9kxgf1tIi18CLJeq6uVvYGVDfolwTV0+EnbNI/HSnVge/AajgGUcRR0wo9thJgHMXnJK1nttM0F2n3W7zzEa+y15EuMQRNwBIr4DiFEAop/EbR6egmtP6OF4Gh68vzLxS7eJK2T5P717LBjR1gke0svj5/LyyUHDm3kSkGCPMvOd/2YTOphFpwHE1AC34KYt3IcY1qgPu9pEyVCWxu751lrnWpfaXw=='),
			this.addDataEntry(dt + 'stepper alternative label placing optional', 404, 50, 'Stepper with alternative optional label placing',
				'1ZbNUsMgEMefJkdnEki/jm2qnjzpC2DAhJFAJFRbn94lIW0jzVg1Ri3TBP7LEvjB7hDgpNhea1LmN4oyEeDLACdaKdPUim3ChAhQyGmA1wFCIfwDdNVjjWprWBLNpDnHATUOz0RsWGeIyuyEU6qclLYKnrysoLaqjFaPLFFCadClklZ84EK0UoBwjOaTq9jqSpoj/aH+Of2Wv9qRIwRtIngmoZHC1Bl0Xj0zbXhKxNIZCk6pndMqN4WwXlB104eebNuLoJbc+q+ZKpjRO+jiHPC88Xjh1OSOStxIOeNZbroaqZp2th/ogBcqjvBp2tijvaTQ3khu4EWZIVxUvfw1S43PM6a2iGOa+JwtctJALHdugaHHMgrDEzDD78OMPZi95ASX/rEFdvd1GeYYzdySHImZDyI6ASIaAMTEA9FP4nMxvGC2/IMYjhb+wfupIJ6eDuIKMEDsghXDptpVTUUbrp29mD5tVGu4qGp4S+gQReX2YAQh3fM+iO2JPZKmmX2r0nAliWi/CotoPtyYP8opX8gW73fWqPL85FSSlMvszrqsL+KBzsAEdSJwzFw0+1u5aJ8Bxk9Gc48E/olkdJx0+pLTwNeEGI2WYhYexEQzYpgdVtoHHfeS8GtXszAeK6Shebh117bOpfwN')
   		];
		  
		this.addPalette('gmdlSteppers', 'GMDL / Steppers', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGMDLTabsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library tab ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'fixed tab bar', 358, 642, 'Fixed tab bar',
				'3ZnbbqMwEIafhstENianyyZNuittN1VbqZcrFwxYNQEZb5Ps068NJoEALUkgPSBFwsOMMfP59ykGmgWbG44j/zZ0CDPQ3EAzHoYivQs2M8KYYQLqGOjaME0gf4a5qHkKk6cgwpysRJMAMw14xewvSS2pIRZbpg0Ojn2i3IGBprGPI2XnxJb1T13K2CxkIU9ckZtcyk3w8IVkT1bhSsZM9asIF2RT29zEpNt6Q8KACL6VLmvqCD/1QINxGuYT6vk6bGjphuM4NXi72P3XyxudgOpkoFIyoGzLFQJH5QQz6q1UMW3dYY4AuAJTqy5HbrgSOedFcinnCNt05d3rL7b2pscwkgaoYx90G0FWpv9UESJZ5iSWpSedSRXhi4Dp27VPBXmQVSr3teyPTYGZpwEzrdTGCcOCvpJC/edAtE7s0cHGUyrse4HD+iKM/jxjflZPRtWJKQZstUj7g7ScS5s1LGcNHps1/f67kMpm7V7em5iF1/dGxRpC142JKGV99xWNQAxKIO6wR6RFUCFJHCOpaqkc6mo6S3RR7uY5IZjgfZGlippIgyJMbcyutKSFerITOCOu2Ef9SkrXI/NjdQXBmV1kW9Rnq11i2IY2I05cIvNkk7hh19hNS40SP3g38VluCnkftqLMrJqMAuiAwqhE4efj/FZalr/nJR4yU6JiLqmT0KFiAuo4qqqdaGyZZ8IrZVollZySzoG3LQTkUEI4KbO0xq1IqJfV0yq9cR29x6fl5eipipdq4BPqY8egs+VFDdBNNm8iVBBMBeFMQ1+G8KSW8I/7+QUV+mkYD0fvMf5yKobgxKnwiBXRAi6m40UltQuOpe1AQF0wgG0sR2KCue2XkOSXHXkuGlXqnCEx21FKBZKqPUQ7K5XecND9UgWeej5xgEgIuUK/6HKxFsmgOyKZ2DolUj4kaX3gAsl1+sBVs3WqHbgqN1Kfe/po5ZTjGdsvjQeuPJcTRy/49pEI6JvFIaXqVARW7b1aOhUpLjM6ORSB5VOREriMlYykUUw+FaHvD6jBGcWbQ9pH0hl9NzyyuP8vJHXP/1XyHw=='),
			this.addDataEntry(dt + 'fixed tab bar', 358, 642, 'Fixed tab bar',
				'3Zlbc6owEIB/DY86CcFLH6vV9sycnnbazvTxTAqLZBqEgbTV8+tPAkFFQNGCtWXGGbPs5rJfdnPBIGN/cR3R0LsNHOAGmRhkHAWBSP/5izFwbpiIOQa5MkwTyZ9hTive4uQtCmkEc1HHwEwN3il/g1SSCmKx5Frg0NgDpY4MMoo9Gip5BLasf+QyzscBD6JElbjJo9REFLxC9mYezEEpB3MxpT7jSym7Af4OgtlUv3hk/1S92NTlzNYBl75x1ZbuKUQCFpWjTUR6qNcQ+CCipVT5YI7wUg3SG6ZmHrCZp836lh43jVPBbGW7dp78o/1X7ktS8KUazSVBB7mUcjabq2Lau20XI3SJRtYuF28oT5NHKYfUZvPZgx6xtRY9BaFye0ZB9xFtUSGyHEEsS8/ak3gX0A+PCXiUDSjjDzm5pcwTPtd2tUiax5E0rVQWAaeCvUOu/s/QtY6MFH8xU9HdnfkO74og/PtCo5YipCoaa/mblPs7b7DUOaXbS8sbNKx+EQY+FIZu/z5gslurxjsXZq75ziBfQ+C6MYgCzNUoavHtFfje0xlIiWBCAj4khMvZbsfxaJzEYXlYadjE2h/UaQR3sFJVjOWM4Zc6ifjMcVSPV1mFgyvWpr+T0tXAPNNgxn30uQm0zCeFRidMv4mEEEbggvSTDXHNibOK6lMsp7293DLX5rE1EvZZNRlE1ALEQQHir6fJrZTc/ZkUcEpPidr+3RuKtvQyRKdfWCuYLnMGG4QxvigitoaNBGYnq6dRqMMqqE/Pd6eCqqq9U1lWqKEO0dlwXmRLOCG58CoBn0XctwF/UQn+5mFysng+f/T9wT703y7mMTpyOT5gzzbF09FwehjO9hfjAyE2w5C0gRA3saOKgUa2VyCa2zltYNWkU+WM6M79cPtEF5VEy85YzWy2Ov1e+7stfOx10xZhIeTh5TttmCuJ9toDmoV6q0CLd16NZ12UPF+WdSuOrpVZt/Qge95LZyNXWy/Ufq2ddTexfk3qxbvvu1DXzOfDsisvXHb2bejKK79Da+XGCxevvArcM9TSkoUxNAQ4N5vOgvbPh13jumpncv4ppAc/DbUsrr8XpuqbnxP/Aw=='),
			this.addDataEntry(dt + 'fixed tab bar', 358, 642, 'Fixed tab bar',
				'3Zhdb5swFIZ/DZeJwCZALwcN3S66TGulXnvhBKwajIzXJPv1s8Gk6YAFNR/9QEKC1z7H9vvYxsLCUb65EaTMbnkCzMJzC0eCc9k85ZsIGLOQTRMLX1sI2eq2UDxQ6tSldkkEFHJMAGoCngj7DY3SCJXcMiMkpMpAV7ctHFYZKbUuYKnyhyvKWMQZF3VVvKovXU0K/ghtScELFROapkBI2Ax2t5ZMX2+A5yDFVlXZmu5OkY997Pkz18UII9uDiYObLGuayKyphmdBo2VA08xk9lwzNlI1QrpL/2yQejAe9fuFj/Or15d/TLTtMLp2lS6gon/gwQzLUco6oxLuSrLUKddq0igtkzkzxaMMRv0GH3LPNZoARiR9ghf5j3HU7Tj67X5+q5TF93nHWzWwetrxQt4pb/S4sXnfczCuL6VrK+iSsC+MpoUqy2mS6FQhMcJS2QKi1+tRZuL/zlanMzEd5+oE1poGf3Cq+rFrbdLmaUP4alWB7LDY9XMUntkQnvuHxeXw6MQLNe+p1IMN7LOtjgGgJsCeYrMBDBM2G+7HIewNEv76c37BJfhuGHv+IcYfbhX75/9sxU4cBvFbb6WnYYDPgCC4xMlBX69HMHA0GERwmoPCJdfB1Ssh5JtUH9GnaZ6w6S+yfOwQ2T/9DmFpIlosaCyW4MB+1X6jt60w6y4WtwvKOXKxmPYnL3fL9vWk2Bz7MLcWlYqkZQXvCdDn5+OM59O7n70hHP+z0VGvz/8Pmur7vxf+Ag=='),
			this.addDataEntry(dt + 'fixed tab bar', 358, 642, 'Fixed tab bar',
				'3ZnRcqIwFIafhkudhCDQS7Xa3ZntttN2ppedVKJkGgwD2ar79JuQoCLQUgXbLZ065uQkhP/LOQnRQuNofZXgOLzmAWEWmlhonHAu9LdoPSaMWTaggYUuLdsG8t+ypzW1MKsFMU7IUjRpYOsGr5j9IdqiDanYMGMIcBoS5Q4sNEpDHCt7Qmay/9GcMjbmjCeZK5pnl3ITCX8hec2SL2WbkbkVSQRZ1w43M5mxXhEeEZFspMtG1/ZgHyLXd33keTZ0oQsQ6UGku1nRQITaDw18bQsJXYSma9cxD4dTbVhs+98pJL8YkaoFQyXBoBzvEIEP6YYZXSxVUY/uUEcAhmDk1Ok450ux5zzNLuUc4xldLu7MEzs70wOPpQGatvdmjCAv07+qKGVEo4SksvRolFQtViEV5F72o3xWcqJKWygiZqobQbWrob4HzHa0LSEMC/pKCv2fAtE5ctZH64WK1P4iClhf8PjpGScnzXZULUyxgZn7oD8ozXPHLasGP6qauf8tp3JY25v3LuzC7XtesQc+n6dElFTfPkUjEIPT0k91eBzG0micxUJ5anc5dyE4EcOmGAOtyu6WZL8nOJmF0nZLeCylV8uGiyMV7PpTVTGZBNIjIiXCyYIu7zQzhe46M0g3vyHE3cIS4oCv9pLZntM4uw6SmrOXbRmZi11S/JWVLj27s7Q3OG7quF2lPa+NtJfqmXLITeo/vFR/B/AMT+2cC2w3VdB9czdQlRFhVUZ0W8mItl9MiH4Hkem3geiV0xlpTGjf3i6mxssYBJ1B6zmge2oXJWo/HybX0nLze1LiJ4UUFTuvul2dkp7OMBuaJBbRIFBdbbPaTGIgybmT2KbQYJ8lvCjDdPxWFsOe0wW9fPaV8T083pwPn+r4Ri1NQj2tD85NdJ3HJ0KFiKlAbFfE69dGDGsR/7ibnDFGvwxk13sP8v8XxyceZjTZiE7hdORPj3+baCebtgMBdcGgfD7SOgOQXa2/0dUyqNykf+1IaOWA4xnPXqp2kduXsTouR+4i4dunIaCfHxe8tZN0yqjaOhApZsxOzkNggwORnJVsSeO0cp//aYS+P6Dy0UktoMqU9pl0vO+GRxZ3P5Vo9/1fUv4B'),
			this.addDataEntry(dt + 'scrollable tab bar', 358, 642, 'Scrollable tab bar',
				'5ZnbbqMwEIafhstUNpADl02atJW226qN1MuVSwxYNQEZb5vs068NJoEatoRAU2WRIsWDx5j5/I8PGNYs3FwzFAd30QpTw5ob1oxFEc/+hZsZptQwAVkZ1pVhmkD8DHNRcxemd0GMGF7zJg5m5vCG6G+cWTJDwrdUGVYoCbCsDgxrmgQolnaGXdH+1COUziIasbSq5aWXrMZZ9IrzO+toLXym6lGYcbyp7W5qUn29xlGIOduKKu9kxYOshjWcZG4BJn6g3Ea26jhKMoO/892/vfijAlAdDEsLBhR9ubTAQTFBlPhrWcx69zFGAFyCqV0XIy9a80LlRXrJyjFyydp/VG9s703LKBYGqHyfVB9BXiZ/ZBFaosxwIkrPKpLS4z0gHD+JdmSddzEIhS3gIVW3GwEz2wEz7czGMEWcvOFS+8dAtFuO6HDjSxVe+OGKXvAo/vWC2FEj2aoOTNlhq0R6MczKhbDZIz1q8NCoqec/RER0a/fwgWOWHj8Yl1uIPC/BXIv67i0agRhqIB6Qj4WFEy5IHCKpaql81NV0lupCH+YFIZjgc5FlinKEQRImLqKXStJc3tkJnGKP771+pKWrsXlaXUFw5BDZlvXZ6ZAYdaHNmGEPizi5OGk4NHbTUqPADz8NfB6bUtxHnSgzbyanAHqgMNYo3C7nd8Jy/3Ou8RCR4hVzSZ2EPiomJKuVbGonGlfEGbPeZqMaeJs8zcKJ45QiDLW86wCdrj3pRFSDvJ1OeU7qeC6f77+Op2z4XqZCLl92Ak6G2LahdW6IHQ3x8mYuCd/cPl79h4xHTp7FzocxBBrkxWn12z9J+AlEsweI+Ro4b7tfqFCDqiE9duW7gIvpZFGpxZPOmd1ozeqDSttjj9JCNMGIuYEGqbjgLJJS8LLKOSSzUx0ViMCq3WM3a9TBaFgaDr0sUqF+GNMKEedib/alG4VaJMP+iORi65VI25OVgzbx8mqfymo2zbV5q3IL/b1XCfqxSgtdvCD3tXHiKnJpmb2ysfOPOcYsp5Sq8zBYtevu6DysvJjs5TgMNjj8yFkJTxIn+FsROn9A+rlILaDKlHZKOuNzwyOK+69gWfXiR7K/'),
			this.addDataEntry(dt + 'scrollable tab bar', 358, 642, 'Scrollable tab bar',
				'3ZnbbqMwEIafhstEGIccLps07a603VZtpV6uXDBg1QRkvG2yT782GAIxtIRAT0SR4sFjzHz+x4cYcBVuLxmKg6vIxdSAawOuWBTx7Fe4XWFKDcskrgHPDcsyxdewLhrugvSuGSOGN7yNg5U5PCP6F2eWzJDwHVUGFyUBltVNAy6TAMXSzrAj2l96hNJVRCOWVoVeeslqnEVPOL+ziTbCZ6kehRnH28bupibV10schZiznajyQlweZDWgPc/cAkz8QLlNJ6rjKMkMfuG7f3vxQwWgPhhQCwYQfTmD5lExQZT4G1nMencYo5ktP00x8qINL1W+SC9ZOUYO2fi36o0ne9N9FAsDUL53qo9mXib/ZBFAUWY4EaUHFUnp8RIQju9EO7LOixiEwhbwkKrbrYBZ3YBZk8zGMEWcPONK+6dAnHQc0eHWlyoc+6FLxzyK/zwidtJIhvWBqTrslEjHdlYuhW0y1aMGjo2aev5NRES3ioePFlbl8aNZtYXI8xLMtagXb9EKhK2BuEE+FhZOuCBxjKTqpVLV1cWZ/NQO85IQLFMXmZleh4paCIMkTBxEz5SkubxTCJxij++9fqWl85n1sboC5olDZFfVZ69DYtqHNmOGPSzi5OCk5dAoUm6rwNtvBj6PTSXu016UmTeTUzAHoDDTKPy8X18Jy/XvtcZDRIrXzCWHEgLLVTopHSomJK4rmypE44g4YzbYbNQAb1dxKKEEYKGznMx7kdAob6dXevMmevcP1x3pFfpoT082fC0TH5cvOzffG+g2nzchrAimhnCuoS9DeNFI+MftuqtCvzLj6ewtxl9OxcDsOBUesSIqkrJO7R1zaT8Q4BAMQB/LkQQj5gQakrLkylwUqqxyjsTqRyk1SOr2EP2sVEZTe/ilCuh6PnGAiHOxQn/X5WIjEns4IrnYBiWiH5L0n7jyDVnHxNWwdWpMXLUbqc89ffRyyvGInKe6xFUc4zVx6Zi9wOtHIubYqqaUulMRULf36ulUpLrMGORQBOinIhq4nJXwJHGCPxWh7w+oxRnFqyntI+nMvhseUdz/F5JVL/9V8h8='),
			this.addDataEntry(dt + 'fixed tab bar icons', 358, 642, 'Fixed tab bar with icons',
				'3Vldb5swFP01PDayDSHJY5Im1aSurdJq054mh5hg1cQIvDbZr58BQyCGNuFjrYoUKb7ca8w951x/YJhzf38T4sD7zjeEGebCMOch5yL95+/nhDEDAboxzGsDISB/BlrW3IXJXRDgkOzEOQEoDXjB7A9JLakhEgemDBsceSR2B4Y5izwcxPaQOLL/mUsZm3PGw8TVdJMrdhMhfybZnR3fyZiZehQJBdnXDjcxqbHeEO4TER6kyyvdCC/1MIfjNMwjdOupMNtSA8dRatjmsce3l39UAqqTYWrJgHIsUxNclBPM6HYXN9PRneYIgCmYWXU5cvlOFJyXyRU7B9ihu+1KvbF1ND3xQBqgin1UYwRZm/6Nm9CU7ZBEsvVTZTKOePWoII+yn9jnVZJQ2jzhM3X7LMBQM8CQldpCwrCgL6TUfxsQrYaM9vfbWIWDrb9hA8GD32sctmKyWZ2YcsBBiXQwTNuFtFm2njV4adbU8x84lcPKH341QaXHX43KPXDXjYjQsp6/xVlADDUgHvCWSIugQiJxiaSqpXKqq9k80YVO84IQEHhfZKmiJtIQI0wdzKZK0iK+kwucEVcco26T1vUIfayuIBq3o8ihrM9OKWF3oc0gJC6ReXJIdCY18mnprMQP3018lptS3u1OlJl1k6EAekBhpKGwWswXd0+PTQolYSTwjnNXcb6pk9nbqnIkEKS28jK8JuyBR1RQXvLOOr09cVhzIbjfQH81NNhnBRva1riEFdQqOKzSZ0t55hW8XMCzsXRKlLFGlOX0x/3q29OiCVU8gkNxQhPUniYSQ3Efl2AR52IMumcOz3sfgR6INGzCom6qjcaiPtYBE41Fd4vpavarAYUcD38gg0548HlK0RjZTUpRNrl0TKIh7IFEEDRcOlywglzC5Wy8rFxBtoGpHhM40UFpucDPQDD7wAA2xKCk4UhOA46nQVJcphVxUVClzhkkqBvlVEBStefqqNba5ULfy9IONj3POYFICLmj+a/L61pIhv0hkomtV0T0Q6XOCxdIruaFq2arWVu4KjeeVjf7zn5WsrCTU6E1dp7PLlxFXBpWL/j2ERIYoHJJqTpFglV71Y5OkUblib+PxSPUT5E04DKsZCQNIvKpEPr6AJ1xpvNmSftIdEZfDR7ZPH47St2Ln5b+AQ=='),
			this.addDataEntry(dt + 'fixed tab bar icons', 358, 642, 'Fixed tab bar with icons',
				'3Zlbb5swFMc/DY+JfOGWxyS9vGxStU7a4+QSc1EdQOA1yT79DBgSamgJmEUqUaT4+NiY8/P/YDsG3u6PjxlJw+/JjjID3xt4myUJr37tj1vKmIFAtDPwnYEQEF8DPfTUwrIWpCSjMR/SAFUN3gj7QytLZcj5iUnDjuQhLdyBgTd5SNLCnlFP9L/xI8a2CUuy0hX75VW48Sx5pXVNnMSizUbeimacHnuHW5rkWB9psqc8OwmXU1W7MJeW6ZgOtoDr2qZtQrqAuOrlEO14WLlhy61sIY2CUPZsm/LZSF4Zgqb7c4DEDxmj7nhhJV5QDHeNwVVhIywK4qJYje59GB2r+PSF0U9ifuH8UF6Fc0q8KA5+yCc2z6afSSoMULZ9lmMEdTn6WxRFGPEmo7ko/ZKRLFocwojTZ9FP4XMQ81TYQr5nsnoQU9TN9DNgyKxsGWWER2+01f8UiObISb8/BoVQl8F+x5Y8SX+/kGzSZMfdgWk3kFMfLC1lnpu2GjV4bdTk/Z+SSAyruflihVq3XzjtHhLfzylXot48xSAQlgLiiQRUWHjEBYlrJNUtlbauHtbFp3OaXwgBAVVkoLzeK2olDAXhyCNsLSXNi5pG4Iz6/NzqW1m6c9BtdQWBO22KnNr61DolbB3aTDPqUxEnj+YDp4ZdXkMDb30a+Do2rbjbWpRZd1NTADNQcLRkSMpoGlbhHsIAgM3qDk1kcKyzJbRNtxUoqKRP2CWOidpo0mc7eyJ3BkquDkohJdnQBKpFJQ0hawwePRpS8MzxdlvpwOOF5DZ0XGSP0U+djjQDwnAGQBCMJHTFmqNJauqaYwqmfiZwpUKZuCRsIMzBAOpQSS6SmBcqSC5Fccklvnwp1Ug0vXk6kHSt0jXlMbudRGdZDMCxhwTvEHEu1sD/dUHWi8Saj0gttlmJqMcQMyQuueUZmbh6Nie9iatzq2Lq2akszDmWX1DLOcIL8V67EldzltbHZWT2gh8fOoAlaqeUrnMH2LW70XTu4LRf/HMszKB67qCAq1mJllGaq1uYWxL6+oAGnAJ8mNJuScf5anhE8fyHROV++X/FPw=='),
			this.addDataEntry(dt + 'desktop tab bar', 758, 152, 'Desktop tab bar',
				'7Zhdj6IwFIZ/DZdOSlHBS1GZ2WRnncy4mWsiB2i2iCndUffXb8uXIpBBrWyyuyQmctpzWt6np1+aMYv2j8zdhs+xB1QzFpoxY3HMs3/RfgaUahgRTzPmGsZI/DTstJTqaSnaugw2vIsDzhw+XPoTMktmSPiB5gbPTUKQ1ZFm2EnobqWdwVrEt31C6SymMUurGn76yGqcxT+gKNnEG+Fj500B47Bv7W5qyvv6CHEEnB1ElR3xeJjVMEdW5hYCCcLCbZR33E0yQ1D6Hr9e/MkFaBbDUCoGQlNkD9vEYJCQX/Cef5beVR58nTxG/iUMqMvJB1Ti3yLZ8ErJon0gx/xDEHn0YV8TScg3tefOYlyWFErhrkoZzUpVHU5003HDqLpUtry9l5iIbpSNDbCZuRzyAGcRYt9PgNdkL3vdicTocxJn4/USyU/H9iXpfDEFo4ECUkNhNKlSMO5AYdydAiWpjH9+4A/rkisa9xO9ovh5BCWKmzXFX9wAhIUTLiS/ZAJvnKhrs7o9mw8bJ/DM8lTIKE1+vOFvwij5ofz9JJiTPrLlrbsmm2AVb0XBRBgkY7J26ZSSYCNsXJbYbv5GwedHr6/p29yUI2QXEg5vwi6b3IkpVthCHtEe1hgd35inh+papXSUWCrWqS0DH4ROa0g6jpZyQ9RJePNT4XFDrupjJclahClyFd2BwqRG4ctq8Swsy2+LGg+hFK+mkJix21PoPGMi4nkyVJk0a6EzMEU50oLqUHE4nWTRuE5uaCkhN7Yq5AZFWKXoikW4zm71vuyPnQy8lNMel19rob8Qp24O++Cpt/J8el30mI3/AFFsoT6I1s/yOVFn+f31P1CFQA1r3AfQG+8jumxQHN2xLef6+wg1VO6yDN7jeKcrue9IwGXrsOnsV+4XG87bVx4HWwi1HwcbACnaYg7MUQXRXfaYeoeLkC6IOBdHq173+a1IRvcjgi3lRMTr8f46q356vf0b'),
			this.addDataEntry(dt + 'desktop tab bar', 758, 152, 'Desktop tab bar',
				'5Zldj6IwFIZ/DZdOSgHBS1F0JtkZzbrZuSZSoNkCBrozur9+W74EgYhOYS40MZHTnlLep+eUHiVlERzXsX3wXyMHEUmxJGURRxHNfgXHBSJEggA7krKUIATsK8FVR6uctoKDHaOQ9nGAmcOHTf6izJIZEnoiucGxEx/x7kBSzMS3D9weoz0b33QxIYuIRHHaVXHTD+9G4+gPKlrCKGQ+Zn4rFFN07JxuasrnukZRgGh8Yl0+sUP9rIeuGZmbj7DnF25aPnE7yQxe6Xt+evYjF6BdDEWoGADMgal2iRGjBP9D7/ljyX3lgffJo+RPEiNiU/yBauN/RTL1TsmCo8fX/JMXOOTp2BCJyTc3lytrWrYUSsG+SintStUdKrrJsGVV3Spbfr9thNk0yptNoJ65nPIBLkaIXDdBtCF7OeteJLTrJC7W6y2SV9f2LeF8MwWlhQIQQ0Gb1SkoA1CY9qdAcCrj9y98tSm5oHU/k2uKX44gRHG9ofjW9hCzUEyZ5Lck8NZE3cjq5mKptibwzPJcyMhNbhTSHTNyfiC/rgy2Sj/8zgd7j0PvV3RgDTNm4Izx3iZzgr2Q2ShvMe38iiCXnr1+pFdLna+QTx9TtGN2fstPlmKZzacBGWGPkeEX4/RU36uErhJDxD51iJGLmE57lPRcLeULUS/h9avCw5ZYladCgrUYpohVMACFWYPCu2U2QDCJaD12WKrujp3LUAmw4/ChymjZM4FRLCg4Ohidag7VUGkhphpCiE2NGrFJMaxQZMXmW2G2e95sty9v6/HA8YE3PNlR/qwG+CaWMmhJe4Jgyiocg6bcoPn7ZWltdg/HcjYcSqiBMVA2j+4vr/O19XgoB0yxijpKjm0WHt6s98cDaUwHA6kWL3zDgmyWQ143P62HAzlgRGpglIjsUU25fl6gMbZDjzRP+VcOC1FJUAe966ZqO6O6Ry4aeNIazIoXvSozTQiyiXyxHw5ReJF7VF6+evZfySvTWA0WNLAlaIQAuDwoDKJ/sw5zR8QkyI73fltVrAyOlkrknYWyDkDdhbKW7UnQ4XuiazVEg5y+ZSFFEDYPikNv1ApIJxJtOCLQEE6EXZ7/2cu6V//4+w8='),
			this.addDataEntry(dt + 'desktop tab bar overflow', 758, 152, 'Desktop tab bar with overflow',
				'7Zldb5swFIZ/DZetwIZALksS2krrUrXdulsUDFgzGIHbJvv1s/lKCLCS1DBpa6RI4djn2LyPj8EnClxE2+vUTcI76iGiwJUCFymlrPgVbReIEAWo2FPgUgFA5V8FOD2tWt6qJm6KYjbEARQOry55QYWlMGRsR0qD52YhEt1VBdpZ6CbCnqINj2/7mJAFJTTNu0I//4huLKU/UdUS05j72OVQKGVo2zvd3FTO9RrRCLF0x7u8YY+FRQ/TsAq3EOEgrNyMcuJuVhiC2nd/9/xHKUC3GFCqGKp6pdp6nxgpyvAv9FzeljZUHnCePLC8kxQRl+FX1Ij/Ecn0MyWLtoFY85dB5JHLbUskLt+VvXRWs7qlUgoMVQp2K9V0ONBNAx2r6lTZyvHuKebTqAe7AGbhsisDHEWgvp8h1pK9nvUgEsb7JI7W6ymSH67tU9L5ZAqwg4Iqh4Ixb1KAI1CYDadAcC7j31/4eltySet+rjUUP44gRXGzpfi9GyBuYZhxyU/ZwDs36taubi+WeucGXlhuKhmFyacxe+RGwU8trw+COflHjJy4GxwHTzThDXNuEIzxxiVXBAcxtzHRYrvlFUE+23t9ya+WplghbyFm6JHbxZBvfIvltpBFZIJnjAY+mKe75rNK6iqxZDynkhT5iOu0QdnA1VK/EA0S3nxXeNCRq9pMSrJWYapcVUegMG9RuH1a3XHL+uuqxYMrxZopxHfs/hQ6zpgIe54IVSfNhuuMUkk50oNq13A43GTVWZucbkkhN7Ma5C6qsFLRVQ/hNrun5/V07ETgtdj2mLhbS/0HcWqmPgVPrZfnzcNqwmz8D4gCS52CaPssXxJ11t8ePoFKBAqt2RRA2/WICujt988MlQlUn4MpgLarJSXQx9sfnzwl8jTmk7wTDai5vH+qeEm6qgD1ycHD4nSKqUCY0Reh3rmVgR5CTYdeXh20ZNXH9KPsg2McPrQBtZmPVgcczbEtZ9qMkYLg+AwxRm1Ma5dqzkiXDLnpJvxjynQUK8fMmENCXUki53x+YRoNRKMc0DUpdRI+D4bjYNIiSS8SYzwiwJJOhF/u//wruh/+N/gb')
		];
		  
		this.addPalette('gmdlTabs', 'GMDL / Tabs', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGMDLTextFieldsPalette = function(expand)
	{
		var s = "dashed=0;shape=";
		var s2 = "dashed=0;shape=mxgraph.gmdl.";
		var gn = 'mxgraph.gmdl';
		var dt = 'gmdl google media design library text field ';
		var sb = this;
		
		var fns = [
			this.addDataEntry(dt + 'single line text field', 346, 360, 'Single-line text field',
				'7ZhbT9swFMc/yx7yCPKlDenj6AUhcZkGGs+mOU2sOnHleLTdp5+dOJDWDbRAJjRI1IuPfXz5/+JjOwEdZqszxRbppYxBBHQc0KGSUlf/stUQhAgI4nFARwEhyHwCMmnJxWUuWjAFud7HgVQOD0z8hspSGQq9Fs4QsyIFWxwF9LRI2cLaFUxN/aczLsRQCqnKonRWXraYVnIOjRwor6qCWC6NEZuEaxyUhlXrAEqT6/0ZyAy0WpsiSx7rtCpBe2HllgJPUudGw2rkiBWVIXn0fdLD/HGS7JaHevKcSjnPmJrbiuMY4m+eXmYsVho7Kj5l4rvgSW5yMh7HolRgwaY8T6wEoZVQ5vqG/7HOBNdpV5tNKyhM7p0brbUsU67hxtRiiyzNo2Nsqc7EIaKS14laa6pAMM0fYKP+twjd84S+Yhm0aeskvICZbsrYeN4iZO9NeTF9cr2VRrVR+NH0pYfq65r4IblpmaB1VSKKNj3kbFaA9ng8dmwvRH0PEUamu2jE1oX5kTPzdW40I2iogGVt7JpAwo3pQNrJ1hMC+aRRef2nIDHud0AyfDno13Fe8Bwe43lT21xesHuopWyP9z6Vt8juHNAx6oWu000SuOeTIO9Eooc6IHHikZhIEYP6CnyvpBSGHVCKWncBNvDds1ZcX7HuEHYD2gG7wcuxbucGN1sldlN+nGSxONaKszwR4EW6XJbhcWsbfILsva/q0bOhDntRDiMfQf9tBFxbR/XKUBPpAkjd/YOJfC1FDgvBXWzvMPa4/BxfXv8a7xPc6I6Dy1bswjSaTMj2QoSeOykxZ5gaFmZN7DTIrYOW6TbYMd0OPgbtBnm0fUR9H5D+mX48Or/9HBg3Hf4p1DqI4ghttN4RZf/VxOj66pNM1g9AedABZJN8evNXFW++GPwL'),
			
			this.addEntry(dt + 'single line text field normal light dark', function()
			{
				var text1 = new mxCell('Hint text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#808080;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=1;noLabel=1;strokeColor=#eeeeee;opacity=50;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (normal)');
			}),
			this.addEntry(dt + 'single line text field hover light dark', function()
			{
				var text1 = new mxCell('Hint text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#808080;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=1;noLabel=1;strokeColor=#cccccc;opacity=50;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (hover)');
			}),
			this.addEntry(dt + 'single line text field press light dark', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#808080;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;opacity=50;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#0C8CF2;opacity=50;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (press)');
			}),
			this.addEntry(dt + 'single line text field focus light', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#0C8CF2;opacity=50;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (focus, light)');
			}),
			this.addEntry(dt + 'single line text field normal light', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=1;noLabel=1;strokeColor=#eeeeee;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (normal, light)');
			}),
			this.addEntry(dt + 'single line text field error light', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#ff0000;');
				part1.vertex = true;
				var text2 = new mxCell('Username or Password is incorrect', new mxGeometry(0, 30, 346, 25), 'text;fontColor=#ff0000;fontSize=12;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text2.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1, text2], 346, 55, 'Single-line text field (error, light)');
			}),
			this.addEntry(dt + 'single line text field disabled', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#808080;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), 'shape=line;strokeWidth=1;noLabel=1;strokeColor=#B3B3B3;dashed=1;dashPattern=1 4;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (disabled)');
			}),
			this.addEntry(dt + 'single line text field focus dark', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#ffffff;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#0C8CF2;opacity=50;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (focus, dark)');
			}),
			this.addEntry(dt + 'single line text field normal dark', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#999999;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=1;noLabel=1;strokeColor=#cccccc;opacity=50;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (normal, dark)');
			}),
			this.addEntry(dt + 'single line text field error dark', function()
			{
				var text1 = new mxCell('Input text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#ffffff;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#ff0000;');
				part1.vertex = true;
				var text2 = new mxCell('Username or Password is incorrect', new mxGeometry(0, 30, 346, 25), 'text;fontColor=#ff0000;fontSize=12;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text2.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1, text2], 346, 55, 'Single-line text field (error, dark)');
			}),
			this.addDataEntry(dt + 'single line text field icon normal light', 346, 35, 'Single-line text field with icon (normal, light)',
				'1ZbLbqswEIafhmUjsAOnXbbpZdPqVOqiazdMsFWDkXEb0qevB7tpCE6C0svRSRTJjD3MzDc/EyI6K9sbzWp+p3KQEb2K6EwrZdyqbGcgZURikUf0MiIktr+IXO/YTbrduGYaKjPGgTiHVyZfwFmcoTEr6Q0NZzUuNcztLS8ao9UzzJRU2horVdm9i4WQcsvkbwzaQLszuc7kM7sBVYLRK3tkKXLD3Qk69RlxEAX3bjR1Nta462Lt+lmqXfhqw5XTw5XnrOGAx2Os22Mo2wK7NSnKXE4MSKi5K/ggmIjQrPuMpUPCdFa+sRNPYYNWkg1heQXEGiQz4hV64UIEfcR7JWwi63AnSdx3UYtFA2aAfJ3oqC5MB12473But8JiQvEtVGVCONH+IN7wcILXCFbMmTyXoqiwaSLP5agmeRPG+1uzuTBYfooCWHJh4MHaMMrSasDauCklxvxiR71DOg009DQg/3h388bKPz1S/lJsiP3RJ4r1V+qWPcEHjT5n26qrDL/fy8krk4SegwC2bQEfgy0bYLtTT0L+e8Gq3xYrSckA+1n8M2L9c6RYjRasKjqO++R5YFbnAv/6hMK+NOoFix0HMNsLMOmJODjNAzjTrw3z9mOY9x+hE/oDs/30Px4xa3XvnjEhsR8xYuzl5+ueo7z5NvgO'),
			this.addDataEntry(dt + 'single line text field icon focus light', 342, 35, 'Single-line text field with icon (focus, light)',
				'1ZZRT4MwEMc/DY8upR2ojzKdL5qY+OBzHTfaWCgp1TE/vS2tc4xuI3M+CFlSrr327nd/bkRkVrb3itbsUeYgInIXkZmSUrtR2c5AiAgjnkfkNsIYmV+E53tm424W1VRBpcc4YOfwQcU7OIszNHotvKFhtLZDBQuzZdZoJd9gJoVUxljJysxlSy7EjslvDEpDuze4zuQjuwdZglZrs2TFc83cCjL1ETHgBfNuJHE22rjnYuP6k6oZ+GzDmZPjmee0YWCXI5u3x1C2ha3WpChzMdEgoGYu4aNgIkzi+XU2vx1LB4fprH1hJ57CFq04HcLyCkAKBNX8A3rHhQj6E58kN4FsjruIUd9FLpcN6AHyTaCjqjAdVCFN0KAQBpKV3lJWegsm6i5vf+afdrEBQDKLlS+ouBG8qGzJeJ6LUSXyphXjGp5rurBbrky5jY3pUtgDflk875BMA7W7Cigd7a/TWKUnJypd8C1dv/hATU5ZJR/oK3zT6EM9l8h3OHkR4pDkA9h2tXoKtnSA7VG+ckNsnDqz7v6f6sQJHnC+Rn+jzssT1akVp1XRgTukx3AfTrvL2HNu/9a4tIVo5LtNdhzA9CDAuKfaYKcO4Ex+16jb70bdf2cuyB/07atz9pT4eE+5S+19ZnXvbyohsZ/QU8zjz6eco7z9pfcF'),
			this.addDataEntry(dt + 'single line text field icon normal light', 342, 35, 'Single-line text field with icon (normal, light)',
				'3ZZNU8MgEIZ/TY7tEChRj1o/LjrjjAfP2GwDIwkZgjb11wsBa2Nom6l60HQ6QzYssM/7dpuEzMv2RrOa36kcZEKuEjLXShk/Kts5SJlgJPKEXCYYI/tN8PWOp2n3FNVMQ2XGJGCf8MrkC/iIDzRmLUOg4ax2Qw0Lu+RFY7R6hrmSSttgpSr77GIppPwSCguDNtDuPFwXCie7AVWC0Ws7ZSVyw/0MMgsn4iAKHtII9THW+Ptik/pZqh2EauOVk8OV56zh4KYjV3fAULaFU2talLmcGpBQc1/wQTAJJll3jaWD43TWQdhpoLBFK82GsIIDkAbJjHiF3nYxgmHHeyXsQTbbTVLUT1HLZQNmgHxz0FEqzAYqZBRNKKWT1Eo/UMTSch5cqspsUUXdFeIP4s1NTh1lx1csmDyXoqicdiLP5SitQmjFhYGHmi3ckiuru41xU0q3wTdVDAl0FhHxNGJ5tFuwsZanR1peii2DP4aDuvordcue4INGH6rV5Spzn5/lFNyIY96PYPtq2mOwZQNsd+pJWGL/352Y4gHnM/Q77jw50p1GC1YVHbh9fjzQkHPh/t+EckI06sUVOw5gthdg2nNttGVHcNLvdez2o2P3fzMT8gsN/PQP95SNu3c3lZjZj+gp9vbznc5T3n7lewc='),
			this.addDataEntry(dt + 'single line text field icon normal dark', 342, 35, 'Single-line text field with icon (normal, dark)',
				'1ZbNTuswEIWfJksq124KLGm5sAEJiQVr00zjEU4cOYam9+mxY1Oaxm2jAhddS5Wc8e9852SahM2L5lbzStyrDGTC/iRsrpUyvlc0c5AyoQSzhF0nlBL7S+jNntFxO0oqrqE0QxZQv+CNy1fwER+ozVqGQC145boaFnbLWW20eoG5kkrbYKlKOzZbopQ7obAxaAPN3su1oXCzW1AFGL22U1aYGeFnsEm4kQDMRVjGUh/jtX/ON0s/U7WdkG08c3Y884zXAtx04vIOGIomd2qN8iKTIwMSKuETPgomoWzRtqF0aJzOOgg7ChS2aI2nfVjBAUSD5AbfoHNcjGA48UGhvcjmuLMx6S5Ry2UNpod8c9FBKkx6Kjy0OHelsJic+ZaqNFs4z9sW4o/41022CNjMgcUFl1cS89KJhlkmB4kUQiuBBh4rvnBbrqzgNiZMId0BX5QvLEgnEfUuIl4n+5Ua6vX0RK9L3HL2U7ioy79Ud/wZPmh0oVpd0rZ9L6dgQxozfQTbrltPwTbtYbtXzyh/353KGhONI5KSf2JWmtIe9kvyM2Y9P9GsRiMv85bjIXseKcwZuv85VE6XWr26ZIcBnB4EOO6YOFq6IzjTr1Xu5qNyd1+hM/YDhfziPy4xG3fvrzExs59QYuzj57edp7z96fcO'),
			this.addDataEntry(dt + 'single line text field icon focus dark', 342, 35, 'Single-line text field with icon (focus, dark)',
				'1ZZRT8MgEMc/TR9dKKxTH+10vmhi4oPPuF4LkZaGouv89ELBua5sa+Z8kGQJPTi4+92/t0ZkXrb3itbsUWYgInIXkbmSUrtZ2c5BiAgjnkXkNsIYmV+EF3tW424V1VRBpcc4YOfwQcU7OIszNHotvKFhtLZTBUtzZNpoJd9gLoVUxljJyqylORdix+QPBqWh3RtcZ/KR3YMsQau12bLimWZuB5n6iBjwgnk3kjgbbdxzsXH9SdVMfLbhzMnxzDPaMLDbkc3bYyjbwlZrUpSZmGgQUDOX8FEwESbx4jpd3I6lg8N01r6wE09hi1Y8G8LyCkAKBNX8A3rXhQj6G58kN4FsrruIUd9F5nkDeoB8E+ioKkwHVZglaFAIA8lKL5eV3oKZd8Pbn/mn3WwAkNRi5UsqbgQvKlsynmViVIm8acW4hueaLu2RK1NuY2O6FPaCXxbPOyTTQO2uAkpH++s0VunJiUoXfEvXLz5Qk1NayQf6Ct80+lDPJfIdTl6EOCT5ALZdrZ6CbTbA9ihfuSE2Tp2X3fif6sQJHnC+Rn+jzssT1akVp1XRgTukx3AfXnbD2DNu/9a4tIVo5LtNdhzA2UGAcU+1wU4dwJn8rlG33426/85ckD/o21fn7Cnx8Z6SdOPM6t7fVEJiP6GnmMefTzlHeftL7ws='),
			this.addDataEntry(dt + 'single line text field icon normal dark', 342, 35, 'Single-line text field with icon (normal, dark)',
				'3ZZdT8MgFIZ/TS+3UBhTL938uNHExAuvcT0tRFoaiq7z1wsF52qZa6ZeKMkSevg8z/v2rAlZlu21ZjW/VRnIhFwmZKmVMr5XtkuQMsFIZAm5SDBG9pfgqz2jaTeKaqahMmMWYL/ghcln8BEfaMxGhkDDWe26GlZ2y0VjtHqCpZJK22ClKju2yIWUn0JhY9AG2r2X60LhZtegSjB6Y6esRWa4n0Fm4UYcRMHDMkJ9jDX+udgu/UjVdkK28czJ4cwz1nBw05HLO2Ao28KpNS3KTE4NSKi5T/ggmASTVdfG0sFxOpsg7DRQ2KGVzoewggOQBsmMeIHecTGC4cQ7JexFtsdNUtRfovK8ATNAvr3oKBVmAxXmFE0opZPUSj9QxNJyHsxVZXao5l0L8Xvx6iZbEmTh+IoVk+dSFJXTTmSZHKVVCK25MHBfs5Xbcm11tzFuSukO+KaKYQGdRUQ8jVge7RdsrOXpkZaXYsfgD+GiLv9K3bBHeKfRh2p1oV37WU7BjTjm/Qi2z6Y9Btt8gO1WPQpL7P+7E1M84HyGfsedJ0e602jBqqID95UfDxTkTLj/N6GcEI16dsmOAzj/EmDac220ZEdw0u9V7Pa9YvffmQn5hQJ++odrytbd+4tKzOxH1BT7+PFN5ynvfvK9AQ=='),

			this.addEntry(dt + 'single line text field normal light dark', function()
			{
				var text1 = new mxCell('Label text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#808080;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 25, 346, 10), s + 'line;strokeWidth=1;noLabel=1;strokeColor=#999999;opacity=80;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, part1], 346, 35, 'Single-line text field (normal)');
			}),
			this.addEntry(dt + 'single line text field focus light', function()
			{
				var text1 = new mxCell('Label text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#1F9BFD;fontSize=12;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var text2 = new mxCell('Input text', new mxGeometry(0, 20, 346, 30), 'text;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text2.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 45, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#1F9BFD;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, text2, part1], 346, 55, 'Single-line text field (normal, light)');
			}),
			this.addEntry(dt + 'single line text field focus light', function()
			{
				var text1 = new mxCell('Label text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#cccccc;fontSize=12;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var text2 = new mxCell('Input text', new mxGeometry(0, 20, 346, 30), 'text;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text2.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 45, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#eeeeee;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, text2, part1], 346, 55, 'Single-line text field (normal, light)');
			}),
			this.addEntry(dt + 'single line text field focus light dark', function()
			{
				var text1 = new mxCell('Label text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#999999;fontSize=12;verticalAlign=middle;strokeColor=none;fillColor=none;textOpacity=80;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var text2 = new mxCell('Input text', new mxGeometry(0, 20, 346, 30), 'text;fontColor=#999999;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;textOpacity=80;whiteSpace=wrap;html=1;');
				text2.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 45, 346, 10), 'shape=line;strokeWidth=1;noLabel=1;strokeColor=#999999;dashed=1;dashPattern=1 4;opacity=80;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, text2, part1], 346, 55, 'Single-line text field (normal)');
			}),
			this.addEntry(dt + 'single line text field focus dark', function()
			{
				var text1 = new mxCell('Label text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#1F9BFD;fontSize=12;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var text2 = new mxCell('Input text', new mxGeometry(0, 20, 346, 30), 'text;fontColor=#ffffff;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text2.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 45, 346, 10), s + 'line;strokeWidth=2;noLabel=1;strokeColor=#1F9BFD;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, text2, part1], 346, 55, 'Single-line text field (normal, dark)');
			}),
			this.addEntry(dt + 'single line text field focus dark', function()
			{
				var text1 = new mxCell('Label text', new mxGeometry(0, 0, 346, 30), 'text;fontColor=#999999;fontSize=12;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text1.vertex = true;
				var text2 = new mxCell('Input text', new mxGeometry(0, 20, 346, 30), 'text;fontColor=#cccccc;fontSize=16;verticalAlign=middle;strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;');
				text2.vertex = true;
				var part1 = new mxCell('', new mxGeometry(0, 45, 346, 10), s + 'line;strokeWidth=1;noLabel=1;strokeColor=#999999;');
				part1.vertex = true;
				return sb.createVertexTemplateFromCells([text1, text2, part1], 346, 55, 'Single-line text field (normal, dark)');
			}),
			this.addDataEntry(dt + 'full text field', 362, 56, 'Full text field',
				'vVTBboMwDP2aHFvRpLCdR7deNmlSDztHxZBogaCQFbqvn0nSFlQ6Ia2aJST84hc770UhLC27reG1eNMZKMKeCUuN1tb/lV0KShEayYywDaE0wo/QlxurK7ca1dxAZecQqCccuPoCj+yAm73wcGOPKsAZbwT0pIiwp0bwuscN7K1PM91ivuoTa/QnpFpp45gMXJxXPmRmRajNpVKDytxFj+vK7uR33wLn8PmgLnWBOFeyqBBTkLs5ar6XVfHqsk0SI9QKaWGHeL9XizIjJmypwgDh9GAsdDcVdFCQbwu6BGuOWNKGg+AqS4KOAmQhAi1OPMYbnxdn6sUP/AmWTNvDruyZZ0zZFf2VWhZlppYndUby0ymrEhdzdaHTuhzDvVvGnjLQaZVcy3TCDChu5QFG7aa0Cx3ftcRBaBTmOykTui8exxvoPG/AXkl/HnuWG+t7uNH9oxVjwm/GrCeMWd/FmAWLx848/N0ZTC9PpC8fvqA/'),
			this.addDataEntry(dt + 'full text field', 362, 294, 'Full text field',
				'7Vhdb5swFP01PDYyhtDmMU26vmxTpU7asxtuwKqxI9vNx379jDEJDKLSFU/VGkuRuMe+2DqHc6/iIFoU+3tJNvk3kQILorsgWkghdPVU7BfAWIARTYNoGWCMzC/AX87MhnYWbYgErock4CphS9gLVAipEKUPzCEpUTmU61EQ3aqcbEpcwkpXYSp2Jg7LQEvxDAvBhLSZEdhxnPlJU527tWvKWGPl2o4SF1w/0l/lFuYcVdxYh+wwOGE04wZjsLbn2JAV5dlXGy2TqYHKYz8QrUFyuydGsUG3IDVdETZ3+VpsTuk/ymCZGGCXUw2PBi0PsjPyGCzXBXOnd6yZd8H+LPMWcrTfgyhAy4NZsnMsmNkocfznQLPcpeFZXIFEVUB2zD0JaR6clv26Rh1dh8la7LPyW5xkRcomNbct8XCf0IkdQ4nBrxITJl1eakwCI5puofX6Pq7cDg+Cmo0xcuepmTi4ELVfINZrBbpD9fGYg9iPx2B//w+pbyc0hYh7hIhHEeIqmraVwB6UmP6lEozy/rp1vsZJUKZuNdeOZIbeKhGi94ngSI9nHkhPOqTPiRTcQLfAOWj9thbTYpwLK0yzfTjoj47QaCRh0t8hGgW9K15fB/ApaDKOoNPYg6DXY9SzFwVyiJxvrmnJkJrm6EGTaafGxairRvxONeoaV6vqtr/y0m5uun57eoKSg0UuqdLAFfCL57x5Lgx9mG72oU1389lNVzfgpusYo6XpBOdCqovh/Bnu2ofhwvBDO6764D615bq3FXNmGMPoOzAlLi3On+Nw5MVxo1xT+HPcoH/L/5HjTHi6eqyWN28mfwM='),
			this.addDataEntry(dt + 'inset text field', 362, 56, 'Inset text field',
				'rVRRb4MgEP41PLZRqGbPs1tftmRJH/ZM9BQyFIOs2v36IdBWq21M2ktMvO/uuOP7AESSstspWrNPmYFA5A2RREmp3V/ZJSAEwgHPENkijAPzIfx+IxraaFBTBZVeUoBdwYGKX3DIHqhKmYMbfRQezmjDoC8KEHltGK17XEGqnZvJ1vhh72glfyCRQipbScDaOfLNM818bs6FGGTm1npcVnrP//oWZg7nD/ISawangheVwQTkdo6aprwqPqy3jSMDtYxr2Bu8X6s1NBuM6VL4AfzuQWnobjJoIU/fDmQJWh1NSus3YqIk9jwy4AXzZVHsMNo4vziXXvQwP16SeXnIRJ5lwpRd0R+pdVFmYt04Ra8FwHNixdaWMoPnmTn6k7eOXMmAqTCeEnXCFAiq+QFG7ebY8x2/JDeD4MDPd+LGd1+9jBeQed6AnpB/HnuRHptn6HGQPJ3eh/tyXN2Up8g0Lrgn2szp9u/Ko6KtyGasWhg8LptxLy+oSx8+sP8='),
			this.addDataEntry(dt + 'focus card suggestion', 362, 246, 'Focus card suggestions',
				'7VdNj5swEP01HLsCQ9zk2E26e2mllbZSz26YgFWDWeMkpL++4w8S2BA16sJqD7EUhXmesSfvTTwmiJdF86hYlX+XKYgg/hrESyWldk9FswQhAhLyNIhXASEhfgLycGE2srNhxRSU+poA4gJ2TGzBISnUNSjt8FofRIuzOgcTFQbxfZ2zyuAK1tqZqdyjHRlDK/kbllJIZSNjsOM485OnOve+Gy5Ex3Njh8FlqZ/5H7MF5uHsjl9oB+JM8KxETMDG5lGxNS+zb9Za0RlCJu0npjWo0u5JwgTRHf5Cvmbii4/XsjqF/zDGiiKwz7mGZ0RNInsUCbFcF8Jn77nDtaC5yL+FPPmPIAvQ6oAue88CzsbUq5ADz3IfRhLqQFY7IDvGnuTEB6/osLrxmbrXyVo0manIu6xIxV3LbU88MiQ0teNaYsg/iYnoOS8tpkAwzXfQW36IK7/Dk+S4MQl9Pi0TB2+G/QXkZlODPqP6mOZV7CdjsN+8I/X9gK4QyYAQyShCfIpnfSXIBErM/lMJwcvhc+vyGaegxnOr6zvSn2HwlIjCt4ngSU8WE5BOx2ktPaZLaQXptg0PveoEnQYS0eHO0DnIX7WXhR2DYg51hCkFTuajCDxLJhD482WBsSypaHVAc30kl75szd3m/tTFOxDNzPcvptpwTMGt4GZulfPulROFUxzI84lKp87x7narnY9SO7MprlWLiWoHaddsq5gtmVsFfYwKWszfXkFonl6onXv3ffsv')
   		];
		  
		this.addPalette('gmdlText Fields', 'GMDL / Text Fields', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
})();
