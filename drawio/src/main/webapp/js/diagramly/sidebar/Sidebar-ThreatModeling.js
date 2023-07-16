(function()
{
	Sidebar.prototype.addThreatModelingPalette = function()
	{
		var w = 100;
		var h = 100;
		var gn = '';
		var dt = 'threat modeling ';
		this.setCurrentSearchEntryLibrary('threatModeling');
		
		this.addPaletteFunctions('threatModeling', 'Threat Modeling', false,
		[
			this.createVertexTemplateEntry('rounded=0;whiteSpace=wrap;html=1;', w * 1.2, h * 0.6, '', 'External Entity', null, null, this.getTagsForStencil(gn, 'external entity', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;', w * 0.8, h * 0.8, '', 'Process', null, null, this.getTagsForStencil(gn, 'process', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;aspect=fixed;', w * 0.8, h * 0.8, '', 'Multi-Process', null, null, this.getTagsForStencil(gn, 'multi process', dt).join(' ')),
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=none;', w * 1.2, h * 0.8, '', 'Data Store', null, null, this.getTagsForStencil(gn, 'data store', dt).join(' ')),
		 	this.createEdgeTemplateEntry('endArrow=classic;html=1;fontColor=#FF3333;', w * 0.5, h * 0.5, '', 'Data Flow', null, dt + 'data flow'),
		 	this.createEdgeTemplateEntry('endArrow=classic;startArrow=classic;html=1;fontColor=#FF3333;', w * 0.5, h * 0.5, '', 'Bidirectional Data Flow', null, dt + 'bidirectional data flow'),
			this.createVertexTemplateEntry('html=1;fontColor=#FF3333;fontStyle=1;align=left;verticalAlign=top;spacing=0;labelBorderColor=none;fillColor=none;dashed=1;strokeWidth=2;strokeColor=#FF3333;spacingLeft=4;spacingTop=-3;', w * 2.9, h * 1.4, 'Trust Boundary', 'Trust Boundary', null, null, this.getTagsForStencil(gn, 'trust boundary', dt).join(' ')),
			this.createVertexTemplateEntry('shape=requiredInterface;html=1;verticalLabelPosition=bottom;dashed=1;strokeColor=#FF3333;strokeWidth=2;fillColor=none;fontColor=#FF3333;align=center;verticalAlign=top;labelPosition=center;', w * 0.2, h * 3.3, '', 'Trust Boundary', null, null, this.getTagsForStencil(gn, 'trust boundary', dt).join(' ')),
			this.createVertexTemplateEntry('text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;', w * 0.8, h * 0.2, 'Label', 'Label', null, null, this.getTagsForStencil(gn, 'label', dt).join(' ')),
			this.createVertexTemplateEntry('text;html=1;strokeColor=#d6b656;fillColor=#fff2cc;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;', w * 0.4, h * 0.2, 'A01', 'Asset Label', null, null, this.getTagsForStencil(gn, 'asset label', dt).join(' ')),
			this.createVertexTemplateEntry('text;html=1;strokeColor=#82b366;fillColor=#d5e8d4;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;', w * 0.3, h * 0.2, 'C01', 'Security Control Label', null, null, this.getTagsForStencil(gn, 'security control label', dt).join(' ')),
			this.createVertexTemplateEntry('text;html=1;strokeColor=#b85450;fillColor=#f8cecc;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;', w * 0.4, h * 0.2, 'TA01', 'Threat Actor Label', null, null, this.getTagsForStencil(gn, 'threat actor label', dt).join(' ')),

			this.addDataEntry('asset table', 360, 90, 'Asset Table', '5Vdtb9owEP41+TrlpWTbxxFKO2n7UvYHTHwhVh07so8G+ut3ThxICQUqoUkrUZB8T+7Ozj3PnUiQZNXmwbC6/K05yCC5D5LMaI3dqtpkIGUQh4IHySyI45B+QTx/52nUPg1rZkDhJQFxF/DC5Bo65Ie1gLaDLW6lh23JardEtnTQ1CIzuBCvDktCAnKtkAkFhoCotaVktRWt+6z1KIXkv9hWr7FP1FvTQkiZaalNu1tSFEWc5+02Rj/D4AlPl+kkdRG038Kfz+1HB+S66Y1GVJIpmL9NO28vHzzAw/YivCkFwqJmucvaECuElVhJn9YXCwzC5t2Ct5Cv9gPoCtBsyaURHMvOI0k7UsISxKr0Yd89xmxnr3ahe/po4Rk8zmYyYvM0j0+uYNNSG/Hq2JOeqCG34aCaj8D4ATTVfLuLGlIlVAlGOGpR195DQoF+udSIuvKG8VUIj8qGG13/YWYFvctQK/ttai0UtrWbTOmmambhl0kwoZfOyI72Nt3O3ZACFB2aROsyA7PYgMVeWt3rR+kJtVwkh/i4HLaeMc/6OXUkV1DH3UgdP2cjfQzUfqwZqMsV5H4InKRdU10K2XZkKTgHdcCc0gp62sDcv0DHXnSi3m9b/pLiJ2d7MYo/WG2f7clVQa3oLB9PxyS9sWJI3bNW3I443J30IlonI1pnYHMjahRa3Sa/mwMyBgTFd1fl+6J01+U7vbkhP5TSfzfh03844b+O/82F0ScfAekNjPhv51v+Jkj9THOdzP1nXuc+/Ar8Cw=='),
			this.addDataEntry('threat actor table', 360, 90, 'Threat Actor Table', '5VfbjtowEP2avFa5EEofNwG2ldqXZX/ASwZs1bEjZ9jAfn3HjgMpYYGVUKUuUZA84/HYPufMiARJXm4fDav4L12ADJJZkORGa2xH5TYHKYM4FEWQTIM4DukXxPN3ZiM3G1bMgMJrFsTtglcmN9B6nrkBhuR7WKI2dTtf4076+Zqzyg6RvVhXViMzuBBv1peE5FhqhUwoMOSInC0lq2rhwqcuggtZ/GQ7vcEuUWdlKyFlrqU2brdkPslnee62Mfo39GaySTpKbbYV7bfw57P70QEL3XRGI0rJFMyP0rrHL+75Q/eQv+ECYVGxpc3aED3k41hKn9ajBgZh+y7yzuVhfwRdApodhTSiQN5GJOOWnZCDWHO/7Jv3sbq11/ulBx5p4Kk8TWsyoPU8j08WsIxrI94se9IT1ec27KH5HVhx5Mp0sduv6lMlFAcjLLWoKx8hYYV++KIRdekN41EIT8qmMLp6ZmYNXUhfK4dtKi0UOuzSjF5CMw+/pEFKl87Jjg42vTbckAIUHZpEazMDq7GBGjtptdePxmfUcpUc4tNy2HnGPOuX1JHcQB2jgTp+TAf66Kn9VDFQlStY+iZwlnZNuKykq0guigLUEXNKK+hoAzN7hZa96Azef5f8NeAnF2sxij+Its/2ZFFQazrLx9MxSTdWDKl6NqqoBxzuT3oVremA1inUSyMqFFrdJ7/bIzJ6BMWjm/J9Vbrb8j2+uybfl9J/1+HH/7DDfx3+rXsIo0/eA8Z30OMnl2v+Lkj9TI2dzMMHXxve/x78Aw=='),
			this.addDataEntry('security control table', 360, 90, 'Security Control Table', '5VdRb9owEP41eZ2SGDL2Sihdpe6l7A8YfBBrjh3ZRwP99TsnBlJCgUpo0kqUSL7z3dn+vu8sJWJ5uXm0vCp+GQEqYg8Ry60x2I7KTQ5KRWksRcQmUZrG9EXp9IPZpJmNK25B4zUJaZvwytUaWs8MFmsrcUve3Gi0Rrk2xuFWhRhX8MoPkc+9a+yQW5zJN+9jMTkWlMmlBkuOpLGV4pWTTfikiSikEs98a9a4K7SzxkupVG6Usc1qTAxhJAbNMtb8gc7MKJ2zLPMZtN4s7M+v52pZKq5h+r7StHlCfMcfNw/560IizCq+8IVqYoV8BZYqlA1ggUXYfAh44wpoP4IpAa0Hs5YCizaCZS0pcQFyVYS0H8HHXWuv9qkH+mgQGDzNJuuxeZ66F1P7Axor3zxhKnDTpTPuoPkTuDhyjY3Y7rO67EhdAMmI/GiqEKFgiWE4N4imDIYNKMQnlSKsqX5zu4JdSFceh2UqIzU22A3H9BKaefxtGA3p0DnZycGm14dbUoCmTZNOfWXgDmtwuFNTe/wkO6OWq+SQnpbDNjAWWL+kDnYDdQx66nia9PTRUfupZqDG1rAIfX+WdkO4LJUX2KSQQoA+Yk4bDTvawD68Qstecgbv911+DfjsYi8m6SfRDtVePAp6RXv5fDmu6MSaI3XPWgvX43C/06toHfZonYBbWFmhNPo++d0ckdEhKB3clO+ryt2W7+zuLvmulP67Gz77hzf895408jj54ldAdgdX/Ohyy98FqV/pXifz8JvXhnf/Av8C'),
			
			this.createVertexTemplateEntry('shape=note;strokeWidth=2;fontSize=14;size=20;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#666600;', w * 1.1, h * 0.8, 'Note', 'Note', null, null, this.getTagsForStencil(gn, 'note', dt).join(' ')),
			this.createVertexTemplateEntry('shape=or;whiteSpace=wrap;html=1;direction=north;fillColor=#dae8fc;strokeColor=#6c8ebf;', w * 1.2, h * 0.8, 'AND', 'AND Gate', null, null, this.getTagsForStencil(gn, 'and gate', dt).join(' ')),
			this.createVertexTemplateEntry('shape=xor;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;direction=north;', w * 1.2, h * 0.8, 'OR', 'OR Gate', null, null, this.getTagsForStencil(gn, 'or gate', dt).join(' ')),
			this.createVertexTemplateEntry('rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;', w * 1.2, h * 0.8, 'Leaf', 'Leaf Node', null, null, this.getTagsForStencil(gn, 'leaf node', dt).join(' ')),
		]);
		
		this.setCurrentSearchEntryLibrary();
	};
})();
