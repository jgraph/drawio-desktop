(function()
{
	// Adds GCP (Google Cloud Platform) shapes
	Sidebar.prototype.addGoogleCloudPlatformCardsPalette = function()
	{
		var sb = this;
		var n = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp.compute.';
		var n1 = 'dashed=0;html=1;strokeColor=#dddddd;gradientColor=none;shadow=1;strokeWidth=1;';
		var gn = 'mxgraph.gcp.product_cards';
		var dt = 'gcp google cloud platform card';
		var s = 0.3; //scale
		this.setCurrentSearchEntryLibrary('gcp', 'gcpCards');

		var fns =
		[
			this.addDataEntry(dt + 'product', 170, 55, 'Product Card',
				'rZRdb4MgFIZ/DZczKq11l539uFqyZBe7XIgclQzFIG3tfv1AsNXpsi4dxggv5+DxeQWEk7LdS1IXz4ICR3iLcCKFULZXtglwjkKfUYQ3KAx9faNw98Ns0M36NZFQqVsSQptwJPwAVrFCo87cCZQ0BZhwH+GnQpW6xk2gu42S4gMSwYXsAjHtmp7JGOfpVc+6pvVcEsp0YX1OJSowCxWEitNo1TdGVeEUVyFIBe2PX9lJ7hP3IEpQ8qxDTm4dE7GyJPwCWF64tOXSaqSx4/ySemWmOw7bPEJ8B8KC1CakbHPzB3h5WnupKOuDgv75DlXOOkyG6oD2Aser3WaGqpmLYrxdTzxyvDU39Re24a9scexFj8MWTVHjhedgS+BEsSOMXjjngHvni2C6lNDvK3Q+nsfDfgGRZQ2oiYGXwm/ydDHxNLF2aHFrDfnusSaojEuiUq/s04gBduOBM7FvLq0TzvJKaxwyk2YsYCnhayeXjFL+j2Y5WH7vwXBjBDMbwx0b93oVjb16CML7zdLD6/low4fH5xc='),
			this.addDataEntry(dt + 'product', 190, 55, 'Product Card',
				'5ZVdb4MgFIZ/jZczVlpnLzv7cbVkyS52uRA5KimKQdrqfv1AsNVos27droYxwss5eHwfUQdFeb0TuMyeOQHmoI2DIsG5NL28joAxx/cocdDa8X1PnY6/vTI7a2e9Egso5C0Jvkk4YnYAoxihkg2zAsFVBjrcc9BTJnNV43qmupUUfA8RZ1y0gYi0Tc0klLH4oidtU3oqMKGqsC6n4AXohTJM+Gmw6hslMrOKrRCEhPrqU7aSfcQd8BykaFTIya6jI5bGCS8DmmY2bbEwGq7MOD2nXjxTHWvbtIXoDgszXOqQvE71G+CmcenGPC8PErrrOxQpbW3SrvbcnqPwcbuecFXPBSHarEaMrN/KN/kdb/0vvUWhGyz7LRhbjeauNVsAw5IeYXDDKQL2ni+cqlJ8r6vQcmyGw24BniQVyBHAc+E3MZ2PmK4KzBpJ40rJTzjeQ0FGmJWJUoPihXylH1qcITvuw2mb0jGjaaE0BolO0xRojNnKyjklhP0iL+uX12Ho7w00sTfsl+NeXMEQ14P/F7wWI16R2T5K3JgN9DNYoaePfwfrHjhqePl/mfD+7+0T'),
			this.addDataEntry(dt + 'product', 190, 110, 'Product Card',
				'5ZddT4MwFIZ/DZcujG7ILif7uDIx8cJL09ADNBZKSlXw19vS4iCwOJ0at3VZ1r49p5T3oTvBQWFWbQUu0ltOgDlo7aBQcC5NL6tCYMzxXEoctHI8z1Vfx9vsmZ02s26BBeTykATPJLxg9gxGMUIpa2YFgssUdLjroJtUZmqPq6nqllLwJwg546IJRKRpaiamjEU7PW6a0hOBCVUba3NynoNeKMWEv/ZWfaBEplaxOwQhodp7l41kb3ELPAMpahXyatfREQvjhJsCTVKbNp8bDZdmnHyk7jxTHWvbuIXoCAtTXOiQrEr0EzBJomIS8ax4ltD+PkKe0MYm7WrH7RkKrjerEVf1nB+g9XLAyPqtfJNf8db71FsUTPxFt/lDq9FsYs0WwLCkL9C74BgBe807TtVWPLfdoeVY94ftAjyOS5ADgB8bP4jpbMB0mWNWSxqVSr7B0RPkZIBZmSg1KJ7Le/qmxSmy4y6cpikdM5rkSmMQ6zRNgUaYLa2cUULYD/Kyfrkthu7ZQCNnw/5zHIvL7+O68n6D13zAKzTHR4lrc4C+Bytw9efiYP0oHP+8a0zdLyV/UXKuz73k+JdXcoJTLjl7eJ1zyVmcbMn5n7COgaOGu1cmE959o3oH'),
			this.addDataEntry(dt + 'expanded product', 190, 80, 'Expanded Product Card',
				'5ZZdb4MgFIZ/jbdGpbXusrMf2UWTJbvY5ULkKGQIBunW7tcPBPsR26zZ5s1G0xRezkF8Xjw1QHm9Wyvc0I0kwAO0DFCupNSuV+9y4DxIIkYCtAiSJDLfIFldmY272ajBCoS+JSFxCW+Yb8EpTmj1nnuB4JaCDY8CdE91bfa4iE231Uq+Qi65VF0gIl0zMyXjvDjqZdeMXilMmNlYnyOkALsQxUS+n636zIimXvE7BKVhd/UuO8nf4hpkDVrtTci7X8dG3DkSEQVWUZ+WeQ23blwdUo/MTMdju4wQ/QAhxY0NqXeVPQFhVTRhIetmq6H/fQFRsQ6TpXpCe4Ky2WpxgaqdSzO0nA888rxvApp8CRRlYXp32tIhXzQJp05VwLFmb3B2wUvY/TUfJTNbSaJ+h96o/fmwX0CWZQt64Nph4zcZORkYeY91QY30qGQBbctENbDWMNTWHCn0E/uwYoz8+NSQrhkdc1YJo3EobZo1gRWYz71cM0L4L3oUowuH3peEn1qSnluSjeDIdOBI7p4KIy7dc/E9P7LIfv60H6MYkn5d6/qaxl3Vuv4vMSbSeBSkkzGQzgZIN1uuWcPtIX8QrcbC1J5bznnyL+vO9BdMMcPjK5cLP30j+wQ='),
			this.addDataEntry(dt + 'expanded product', 150, 100, 'Expanded Product Card',
				'7Zhfb6sgGMY/jbdGxM728syuvTrJknNxLhsiqGQoBunWnk9/QHDV6jaXlWZJR9MUHvnz+vzAt9GDSXnYClQXvzkmzIMPHkwE59LUykNCGPPCgGIPrr0wDNTXCzdvXAXt1aBGglRyzoDQDHhGbE+MYoRGHpkVMGoKorsHHrwvZKliXANVbaTgTyThjIu2I8RtUVcyylh60rO2KD0XCFMVWDem4hXRExUI85fBrH8ploVVbIRESHJ48y5byd7ilvCSSHFUXV7sPLrHwjgRFITmRTcssCJqjJC/jj2ZpirWt2kP4Rc8LFCtu5SHXG8BP09rP+VlvZek+92RKqetT9rWnt3xQn/esXXAx4rKM/kZX8OPfV35iwljYz8yqiAMSfpMBktM2W1XeeRULR4GXUwW0HHY7CbgWdYQOaL1GuosgNEIYGK8V+KDcf8cqPJMaiS8kn/oPy0CaNs9RFFblI4YzSulMZLpYdp0miL2y8olxZg5wgMmtr19KHyVTTRks3SAZvHx2erOEKMT277/WLqSucCJuU7cvRu5C4KtMid4XM/Z8eF4xy/bcis7HrqAEl82ndSC430qdykSuPEbiSqsarsSpcW3TivxVFK5CEQ4hHjnIqUsXULEtHm6RXDxFcCtXIJLGW9u8sgBcAV03Ro9dtFseGoqWk/Bgat4tQGfhHOWFTdtOcuewXtpsalRSqvcxmlb91xKXtqAHfCPJvhf5l98d4o6/C7yJgAj/PPP7g9+l/ija+Afv8oAP/i/Bf7l5fGr5uklmenef4f2Hw=='),
			this.addDataEntry(dt + 'service', 110, 50, 'Service Card',
				'tVTRboMgFP0aXo1K23WPm936siVL9rDHhchVyVAM0tbu63cR2upsu27NIEbu4Vy4nCMSmpTtUrO6eFYcJKEPhCZaKeNGZZuAlCQOBSd0QeI4xIfEjydmo242rJmGylySELuENZMrcIgDGrOVHuCsKcDSQ0LvC1NijYsIh43R6gMSJZXuiJR3DWcyIWV6wLOuIZ5rxgUWtsupVAV2oYJxtRms+ia4KTziKwRtoD15yg7yR1yCKsHoLVI2fh3LiJwSYQEiL3za1GOscXG+Tz1ohgMv23EJ6RUSFqy2lLLN7RcQ5GkdpKqsVwZ273eoctHJZFXtqX0ztf2MqgN7PIiSmd/IGv8oK50Hs9t+m41VppNg6lANkhmxhsGGx8T3e74ogaXE4a5Cb9fWhfNhvsqyBszIun3dF7k5Gbn5pFKGDDwXjax/iTNmZDLqaKxNqjKv4tOCEfVxz7Z5aDviTIq8QkxCZtOsEQI3uvNwKTiX/2PZ7MxFuNKg7/fpL5ZgePj/OXr/9/gF')
		];

		this.addPalette('gcpCards', 'GCP / Cards', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
		
		this.setCurrentSearchEntryLibrary();
	};
	
})();
