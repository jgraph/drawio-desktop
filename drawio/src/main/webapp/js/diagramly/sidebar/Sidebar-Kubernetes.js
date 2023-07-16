(function()
{
	Sidebar.prototype.addKubernetesPalette = function()
	{
		var w = 100;
		var h = 100;
		var s = 'sketch=0;html=1;dashed=0;whitespace=wrap;fillColor=#2875E2;strokeColor=#ffffff;points=[[0.005,0.63,0],[0.1,0.2,0],[0.9,0.2,0],[0.5,0,0],[0.995,0.63,0],[0.72,0.99,0],[0.5,1,0],[0.28,0.99,0]];verticalLabelPosition=bottom;align=center;verticalAlign=top;shape=mxgraph.kubernetes.';
		var gn = 'mxgraph.kubernetes';
		var dt = 'kubernetes ';
		this.setCurrentSearchEntryLibrary('kubernetes');
		
		this.addPaletteFunctions('kubernetes', 'Kubernetes', false,
		[
			this.createVertexTemplateEntry(s + 'icon;prIcon=api', w * 0.5, h * 0.48, '', 'API', null, null, this.getTagsForStencil(gn, 'api application programming interface', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=c_c_m', w * 0.5, h * 0.48, '', 'C-C-M', null, null, this.getTagsForStencil(gn, 'ccm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=c_m', w * 0.5, h * 0.48, '', 'C-M', null, null, this.getTagsForStencil(gn, 'cm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=c_role', w * 0.5, h * 0.48, '', 'C-Role', null, null, this.getTagsForStencil(gn, 'crole role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=cm', w * 0.5, h * 0.48, '', 'CM', null, null, this.getTagsForStencil(gn, 'cm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=crb', w * 0.5, h * 0.48, '', 'CRB', null, null, this.getTagsForStencil(gn, 'crb', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=crd', w * 0.5, h * 0.48, '', 'CRD', null, null, this.getTagsForStencil(gn, 'crd', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=cronjob', w * 0.5, h * 0.48, '', 'Cronjob', null, null, this.getTagsForStencil(gn, 'cronjob', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=deploy', w * 0.5, h * 0.48, '', 'Deploy', null, null, this.getTagsForStencil(gn, 'deploy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=ds', w * 0.5, h * 0.48, '', 'DS', null, null, this.getTagsForStencil(gn, 'ds', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=ep', w * 0.5, h * 0.48, '', 'EP', null, null, this.getTagsForStencil(gn, 'ep', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=etcd', w * 0.5, h * 0.48, '', 'ETCD', null, null, this.getTagsForStencil(gn, 'etcd', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=group', w * 0.5, h * 0.48, '', 'Group', null, null, this.getTagsForStencil(gn, 'group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=hpa', w * 0.5, h * 0.48, '', 'HPA', null, null, this.getTagsForStencil(gn, 'hpa', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=ing', w * 0.5, h * 0.48, '', 'ING', null, null, this.getTagsForStencil(gn, 'ing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=job', w * 0.5, h * 0.48, '', 'Job', null, null, this.getTagsForStencil(gn, 'job', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=k_proxy', w * 0.5, h * 0.48, '', 'K-Proxy', null, null, this.getTagsForStencil(gn, 'k proxy kproxy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=kubelet', w * 0.5, h * 0.48, '', 'Kubelet', null, null, this.getTagsForStencil(gn, 'kubelet', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=limits', w * 0.5, h * 0.48, '', 'Limits', null, null, this.getTagsForStencil(gn, 'limits', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=master', w * 0.5, h * 0.48, '', 'Master', null, null, this.getTagsForStencil(gn, 'master', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=netpol', w * 0.5, h * 0.48, '', 'Netpol', null, null, this.getTagsForStencil(gn, 'netpol', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=node', w * 0.5, h * 0.48, '', 'Node', null, null, this.getTagsForStencil(gn, 'node', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=ns', w * 0.5, h * 0.48, '', 'NS', null, null, this.getTagsForStencil(gn, 'ns', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=pod', w * 0.5, h * 0.48, '', 'Pod', null, null, this.getTagsForStencil(gn, 'pod', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=psp', w * 0.5, h * 0.48, '', 'PSP', null, null, this.getTagsForStencil(gn, 'psp', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=pv', w * 0.5, h * 0.48, '', 'PV', null, null, this.getTagsForStencil(gn, 'pv', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=pvc', w * 0.5, h * 0.48, '', 'PVC', null, null, this.getTagsForStencil(gn, 'pvc', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=quota', w * 0.5, h * 0.48, '', 'Quota', null, null, this.getTagsForStencil(gn, 'quota', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=rb', w * 0.5, h * 0.48, '', 'RB', null, null, this.getTagsForStencil(gn, 'rb', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=role', w * 0.5, h * 0.48, '', 'Role', null, null, this.getTagsForStencil(gn, 'role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=rs', w * 0.5, h * 0.48, '', 'RS', null, null, this.getTagsForStencil(gn, 'rs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=sa', w * 0.5, h * 0.48, '', 'SA', null, null, this.getTagsForStencil(gn, 'sa', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=sc', w * 0.5, h * 0.48, '', 'SC', null, null, this.getTagsForStencil(gn, 'sc', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=sched', w * 0.5, h * 0.48, '', 'Sched', null, null, this.getTagsForStencil(gn, 'sched', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=secret', w * 0.5, h * 0.48, '', 'Secret', null, null, this.getTagsForStencil(gn, 'secret', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=sts', w * 0.5, h * 0.48, '', 'STS', null, null, this.getTagsForStencil(gn, 'sts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=svc', w * 0.5, h * 0.48, '', 'SVC', null, null, this.getTagsForStencil(gn, 'svc', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=user', w * 0.5, h * 0.48, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'icon;prIcon=vol', w * 0.5, h * 0.48, '', 'Vol', null, null, this.getTagsForStencil(gn, 'vol', dt).join(' '))
		]);
		
		this.setCurrentSearchEntryLibrary();
};
		
})();
