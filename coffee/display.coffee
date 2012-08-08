require([
], () ->
    console.log("display")
    #style
    lineSet = "line1"
    dotSet = "dot1"

    # size
    margin = {top: 15, right: 15, bottom: 25, left: 40}
    width = 400 - margin.left - margin.right
    height = 400 - margin.top - margin.bottom



    _Math = Math
    $.fn.showD3 = (parmas) ->
        if (!parmas)
            return
        data = parmas.data

        # row & column
        num = parmas.num

        # margin
        margin = if (parmas.margin) then (parmas.margin) else ({})
        margin.top = if (margin.top) then (margin.top) else (10)
        margin.right = if (margin.right) then (margin.right) else (15)
        margin.bottom = if (margin.bottom) then (margin.bottom) else (25)
        margin.left = if (margin.left) then (margin.left) else (40)

        # width
        width = if (parmas.w) then (parmas.w) else (400)
        width = width - margin.left - margin.right

        # height
        height = if (parmas.h) then (parmas.h) else (400)
        height = height - margin.top - margin.bottom

        # domain
        domainX = if (parmas.domainX) then (parmas.domainX) else ([0, num])
        domainY = if (parmas.domainY) then (parmas.domainY) else ([0, num])

        dx = d3.scale.linear()
            .domain(domainX)
            .range([0, width])
        dy = d3.scale.linear()
            .domain(domainY)
            .range([height, 0])
        dy2 = d3.scale.linear()
            .domain(domainY)
            .range([0, height])
        # interpolate
        line = d3.svg.line()
            .interpolate("basis")
            .x((d) -> dx(d.x))
            .y((d) -> dy(d.y))



        # d3 start
        $svg = d3.selectAll(this).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        # box
        $svg.append("svg:rect")
            .attr("class", "box")
            .attr("width", width)
            .attr("height", height)

        # grid-line
        #for i in [0...num]
        #    ((i) ->
        #        r_data = d3.range(2).map((idx) ->
        #            {x: i, y: (idx * num)}
        #        )
        #        c_data = d3.range(2).map((idx) ->
        #            {x: (idx * num), y: i}
        #        )
        #        $svg.append("path")
        #            .datum(r_data)
        #            .attr("class", "line")
        #            .attr("d", line)
        #        $svg.append("path")
        #            .datum(c_data)
        #            .attr("class", "line")
        #            .attr("d", line)
        #    )(i)

        dw = width / num
        dh = height / num
        for data_i, i in data
            ((data_i, i) ->
                type = data_i.type
                className = type
                (className == "ghost" && (
                    className += (data_i.ghost).toString()
                ))
                px = dx(i % num)
                py = dy2(_Math.floor(i / num))
                $svg.append("svg:rect")
                    .attr("id", ("grid_" + i))
                    .attr("class", className)
                    .attr("x", px)
                    .attr("y", py)
                    .attr("width", dw)
                    .attr("height", dh)
            )(data_i, i)
        @


    $.fn.updateD3 = (cells) ->
        elm = d3.select(this[0])
        cells.map((thisCell) ->
            thisCell.visied = false
            _id = "#grid_" + thisCell.position
            _className = thisCell.type
            (_className == "ghost" && (
                _className += (thisCell.ghost).toString()
            ))
            elm.select(_id).attr("class", _className)
        )
        @

)
